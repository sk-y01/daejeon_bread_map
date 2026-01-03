/**
 * BakeryFormPage.jsx
 *
 * @description
 * 관리자용 빵집 등록/수정 폼 페이지.
 * id 존재 여부에 따라 등록/수정 모드 결정.
 *
 * NOTE:
 * - 등록/수정 UI가 동일하여 공용 폼으로 구성.
 */

import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  createBakery,
  updateBakery,
  fetchBakeryDetail,
} from '../../../apis/bakeryApi';
import { FiX, FiPlus } from 'react-icons/fi';

function BakeryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  /**
   * 기본 폼 데이터
   *
   * CHANGE:
   * - menu(string) → menus(array) 구조로 변경
   */
  const [form, setForm] = useState({
    name: '',
    menus: [{ name: '', price: '' }],
    category: [],
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    image: null,
    imageUrl: '',
  });

  // 카테고리 입력용 임시 상태
  const [categoryInput, setCategoryInput] = useState('');
  const [categoryError, setCategoryError] = useState('');

  // preview 상태
  const [previewUrl, setPreviewUrl] = useState('');

  // 수정 모드일 경우 상세 조회
  useEffect(() => {
    if (isEdit) {
      loadDetail();
    }
  }, [id]);

  // cleanUp
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 상세 조회 API 호출
  const loadDetail = async () => {
    try {
      const res = await fetchBakeryDetail(id);
      const data = res.data;

      setForm({
        name: data.name ?? '',
        menus:
          Array.isArray(data.menus) && data.menus.length > 0
            ? data.menus
            : [{ name: '', price: '' }],
        category: Array.isArray(data.category) ? data.category : [],
        address: data.address ?? '',
        phone: data.phone ?? '',
        latitude: data.latitude ?? '',
        longitude: data.longitude ?? '',
        image: null,
        imageUrl: data.image ?? '',
      });
    } catch (err) {
      console.error(err);
      alert('상세 정보를 불러오지 못했습니다.');
    }
  };

  // 공용 input 값 변경 핸들러
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 메뉴 input 변경
  const handleMenuChange = (index, key, value) => {
    const updatedMenus = [...form.menus];
    updatedMenus[index][key] = value;

    setForm({
      ...form,
      menus: updatedMenus,
    });
  };

  // 메뉴 추가
  const handleAddMenu = () => {
    setForm({
      ...form,
      menus: [...form.menus, { name: '', price: '' }],
    });
  };

  // 메뉴 삭제
  const handleRemoveMenu = (index) => {
    if (form.menus.length === 1) return;

    setForm({
      ...form,
      menus: form.menus.filter((_, i) => i !== index),
    });
  };

  // 카테고리 입력 로직
  const handleCategoryKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      const value = categoryInput.trim();
      if (!value) return;

      if (form.category.includes(value)) {
        setCategoryError('이미 추가된 카테고리입니다.');
        setCategoryInput('');
        return;
      }

      setForm({
        ...form,
        category: [...form.category, value],
      });

      setCategoryInput('');
      setCategoryError('');
    }
  };

  // 카테고리 삭제
  const handleRemoveCategory = (target) => {
    setForm({
      ...form,
      category: form.category.filter((item) => item !== target),
    });
  };

  // 이미지 업로드 처리
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일 업로드만 가능합니다.');
      e.target.value = '';
      return;
    }

    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('이미지 용량은 최대 3MB 이하만 가능합니다.');
      e.target.value = '';
      return;
    }

    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  // 등록 / 수정 요청
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('address', form.address);
      formData.append('phone', form.phone);
      formData.append('latitude', form.latitude);
      formData.append('longitude', form.longitude);

      // 메뉴 배열 전송
      form.menus.forEach((menu, index) => {
        formData.append(`menus[${index}].name`, menu.name);
        formData.append(`menus[${index}].price`, menu.price);
      });

      // 카테고리 전송
      form.category.forEach((item) => {
        formData.append('category', item);
      });

      if (form.image) {
        formData.append('image', form.image);
      }

      if (isEdit) {
        await updateBakery(id, formData);
        alert('수정 완료!');
      } else {
        await createBakery(formData);
        alert('등록 완료!');
      }

      navigate('/admin/bakery');
    } catch (err) {
      console.error(err);
      alert('저장 실패');
    }
  };

  return (
    <div className="BakeryForm">
      <h2>{isEdit ? '빵집 수정' : '빵집 등록'}</h2>

      <div className="BakeryForm__card">
        <label>가게 이름</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="성심당 본점"
        />

        <label>메뉴</label>
        <div className="BakeryForm__menu">
          {form.menus.map((menu, index) => (
            <div key={index} className="BakeryForm__menu-row">
              <input
                value={menu.name}
                onChange={(e) =>
                  handleMenuChange(index, 'name', e.target.value)
                }
                placeholder="메뉴명"
              />
              <input
                value={menu.price}
                onChange={(e) =>
                  handleMenuChange(index, 'price', e.target.value)
                }
                placeholder="가격"
              />
              <button
                type="button"
                className="btn btn__light BakeryForm__menu-remove"
                onClick={() => handleRemoveMenu(index)}
                aria-label="remove menu"
              >
                <FiX />
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn__light BakeryForm__menu-add"
            onClick={handleAddMenu}
          >
            <FiPlus />
            메뉴 추가
          </button>
        </div>

        <label>카테고리</label>
        <div className="BakeryForm__category-input">
          {form.category.map((item) => (
            <span key={item} className="BakeryForm__category-tag">
              {item}
              <button
                type="button"
                className="tag-remove"
                onClick={() => handleRemoveCategory(item)}
                aria-label="remove category"
              >
                <FiX />
              </button>
            </span>
          ))}
          <input
            value={categoryInput}
            onChange={(e) => {
              setCategoryInput(e.target.value);
              setCategoryError('');
            }}
            onKeyDown={handleCategoryKeyDown}
            placeholder="카테고리 입력 후 Enter"
          />
        </div>

        {categoryError && (
          <p className="BakeryForm__category-error">{categoryError}</p>
        )}

        <label>주소</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="대전 중구 중앙로 75"
        />

        <label>전화번호</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="042-123-4567"
        />

        <div className="BakeryForm__half">
          <div>
            <label>위도</label>
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="36.32739"
            />
          </div>
          <div>
            <label>경도</label>
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="127.38484"
            />
          </div>
        </div>

        <label>대표 이미지</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />

        {(previewUrl || form.imageUrl) && (
          <img
            src={
              previewUrl
                ? previewUrl
                : form.imageUrl.startsWith('http')
                ? form.imageUrl
                : `${import.meta.env.VITE_LOCAL_URL}/${form.imageUrl}`
            }
            className="BakeryForm__preview"
            alt="preview"
          />
        )}

        <div className="BakeryForm__actions">
          <button onClick={() => navigate('/admin/bakery')}>취소</button>
          <button className="submit" onClick={handleSubmit}>
            {isEdit ? '수정하기' : '등록하기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BakeryFormPage;
