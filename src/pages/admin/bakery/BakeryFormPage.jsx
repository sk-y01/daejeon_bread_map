/**
 * BakeryFormPage.jsx
 *
 * @description
 * 관리자용 빵집 등록/수정 폼 페이지.
 * id 존재 여부에 따라 등록/수정 모드가 결정된다.
 *
 * NOTE:
 * - 상세조회(loadDetail)는 API 완성 전까지 비활성화.
 * - 등록/수정 UI가 동일하여 공용 폼으로 구성.
 */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  createBakery,
  updateBakery,
  fetchBakeryDetail,
} from "../../../apis/bakeryApi";

function BakeryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  /**
   * 기본 폼 데이터
   *
   * WHY?
   * - controlled input 구조를 유지하기 위해 모든 입력값을 상태로 관리.
   */
  const [form, setForm] = useState({
    name: "",
    signature_menu: "",
    category: "",
    address: "",
    phone: "",
    latitude: "",
    longitude: "",
    image: null,
  });

  /**
   * 수정 모드일 경우 상세 조회 후 폼 채우기
   *
   * WHY?
   * - 기존 데이터가 있어야 수정이 가능함.
   */
  useEffect(() => {
    // if (isEdit) loadDetail();
  }, [id]); // FIXME: ESLint 경고 발생 시 useCallback 고려

  /**
   * 상세 조회 API 호출
   *
   * WHY?
   * - 수정 시 기존 데이터를 불러와야 하므로 별도 함수로 분리.
   */
  const loadDetail = async () => {
    try {
      const res = await fetchBakeryDetail(id);
      setForm(res.data);
    } catch (err) {
      console.error(err);
      alert("상세 정보를 불러오지 못했습니다.");
    }
  };

  /**
   * input 값 변경 핸들러
   *
   * WHY?
   * - 모든 입력 값을 하나의 state에서 관리하기 위해 공용 핸들러 사용.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * 이미지 업로드 & base64 변환
   *
   * WHY?
   * - 백엔드 이미지 업로드 스펙이 확정되기 전까지 임시로 base64 처리.
   *
   * TODO:
   * - 실제 이미지 업로드 방식 결정 후 변경 예정.
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setForm({ ...form, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  /**
   * 등록/수정 요청
   *
   * WHY?
   * - 등록(create)과 수정(update)을 동일한 버튼에서 처리하여 UX 통합.
   */
  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await updateBakery(id, form);
        alert("수정 완료!");
      } else {
        await createBakery(form);
        alert("등록 완료!");
      }

      navigate("/admin/bakery");
    } catch (err) {
      console.error(err);
      alert("저장 실패");
    }
  };

  return (
    <div className="BakeryForm">
      <h1>{isEdit ? "빵집 수정" : "빵집 등록"}</h1>

      <div className="BakeryForm__card">
        {/* 기본 정보 입력 */}
        <label>가게 이름</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="성심당 본점"
        />

        <label>대표 메뉴</label>
        <input
          name="signature_menu"
          value={form.signature_menu}
          onChange={handleChange}
          placeholder="튀김소보로"
        />

        <label>카테고리</label>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="빵"
        />

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

        {/* 위도/경도 */}
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
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="36.32739"
            />
          </div>
        </div>

        {/* 이미지 업로드 */}
        <label>대표 이미지</label>
        <input type="file" onChange={handleImageChange} />

        {form.image && (
          <img
            src={form.image}
            className="BakeryForm__preview"
            alt="preview"
          />
        )}

        {/* 액션 버튼 */}
        <div className="BakeryForm__actions">
          <button onClick={() => navigate("/admin/bakery")}>취소</button>
          <button className="submit" onClick={handleSubmit}>
            {isEdit ? "수정하기" : "등록하기"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BakeryFormPage;
