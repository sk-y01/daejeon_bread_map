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
import { FiX } from 'react-icons/fi';

function BakeryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  /**
   * 기본 폼 데이터
   *
   * WHY?
   * - controlled input 구조 유지를 위해 모든 필드를 상태로 관리.
   */
  const [form, setForm] = useState({
    name: '',
    menu: '',
    category: [],
    address: '',
    phone: '',
    latitude: '',
    longitude: '',
    image: null,
    imageUrl: ''
  });

  /**
   * 카테고리 입력용 임시 상태
   *
   * WHY?
   * - Enter / 콤마 입력 기반 태그형 UI를 위해
   *   실제 category 배열과 분리하여 관리.
   */
  const [categoryInput, setCategoryInput] = useState('');
  const [categoryError, setCategoryError] = useState('');
  
  // preview 상태 검증
  const [previewUrl, setPreviewUrl] = useState('')

  /**
   * 수정 모드일 경우 상세 조회
   *
   * WHY?
   * - 수정 시 기존 데이터를 불러오기 위함.
   */
  useEffect(() => {
    if (isEdit) {
      loadDetail();
    }
  }, [id]);

  // cleanUp
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  /**
   * 상세 조회 API 호출
   *
   * WHY?
   * - 서버 응답을 폼 구조에 맞게 매핑
   */
  const loadDetail = async () => {
    try {
      const res = await fetchBakeryDetail(id);
      const data = res.data;

      setForm({
        name: data.name ?? '',
        menu: data.menu ?? '',
        category: Array.isArray(data.category) ? data.category : [],
        address: data.address ?? '',
        phone: data.phone ?? '',
        latitude: data.latitude ?? '',
        longitude: data.longitude ?? '',
        image: null, // 기존 이미지는 파일로 다시 받지 않음
        imageUrl: data.image ?? '',
      });
    } catch (err) {
      console.error(err);
      alert('상세 정보를 불러오지 못했습니다.');
    }
  };

  /**
   * 공용 input 값 변경 핸들러
   *
   * WHY?
   * - name 기반으로 하나의 state에서 폼 관리.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * 카테고리 키 입력 처리
   *
   * WHY?
   * - Enter 또는 ',' 입력 시 category 배열에 추가.
   * - 중복 입력 방지 및 에러 메시지 노출.
   */
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

  /**
   * 카테고리 삭제
   *
   * WHY?
   * - 잘못 입력된 태그를 즉시 제거할 수 있도록 UX 제공.
   */
  const handleRemoveCategory = (target) => {
    setForm({
      ...form,
      category: form.category.filter((item) => item !== target),
    });
  };

  /**
   * 이미지 업로드 처리
   *
   * WHY?
   * - multipart/form-data 전송을 위해 File 객체 그대로 관리
   */
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일 업로드만 가능합니다.')
      e.target.value = ''

      return;
    }

    // 용량 제한 (3MB)
    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      alert('이미지 용량은 최대 3MB 이하만 가능합니다.')
      e.target.value = ''

      return;
    }

    // 이전 Preview URL revoke (메모리 누수 방지)
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      
      return URL.createObjectURL(file)
    })

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  /**
   * 등록 / 수정 요청
   *
   * WHY?
   * - 이미지 파일 포함 전송을 위해 FormData 사용
   */
  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      formData.append('name', form.name);
      formData.append('menu', form.menu);
      formData.append('address', form.address);
      formData.append('phone', form.phone);
      formData.append('latitude', form.latitude);
      formData.append('longitude', form.longitude);

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
      <h1>{isEdit ? '빵집 수정' : '빵집 등록'}</h1>

      <div className="BakeryForm__card">
        <label>가게 이름</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="성심당 본점"
        />

        <label>대표 메뉴</label>
        <input
          name="menu"
          value={form.menu}
          onChange={handleChange}
          placeholder="튀김소보로"
        />

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
        <input type="file" accept='image/*' onChange={handleImageChange} />

        {(previewUrl || form.image) && (
          <img
            src={
              previewUrl
              ? previewUrl
              : (form.imageUrl.startsWith('http'))
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
