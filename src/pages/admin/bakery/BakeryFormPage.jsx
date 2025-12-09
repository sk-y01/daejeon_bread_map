/**
 * BakeryFormPage.jsx
 *
 * @description
 * 빵집 등록 + 수정 공용 폼 페이지.
 * id가 있을 경우 수정 모드이며, 상세 조회 후 폼에 데이터를 채움.
 *
 * WHY?
 * - 등록과 수정의 UI가 거의 동일하므로 파일을 분리할 필요가 없다고 생각함.
 */

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createBakery, updateBakery, fetchBakeryDetail } from "../../../apis/bakeryApi";

function BakeryFormPage() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  /**
   * 기본 폼 데이터
   *
   * WHY?
   * - React controlled input 방식 사용을 위해 state로 관리.
   */
  const [form, setForm] = useState({
    name: "",
    menu: "",
    category: "",
    address: "",
    phone: "",
    lat: "",
    lng: "",
    image: null,
  });

  /**
   * 수정 모드일 경우 상세 조회 후 폼 채우기
   *
   * WHY?
   * - 기존 데이터가 있어야 수정이 가능함.
   */
  useEffect(() => {
    if (isEdit) loadDetail();
  }, [id]); // FIXME: ESLint 경고 시 useCallback 고려

  /**
   * 상세 조회 API 호출
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
   * input 변경 핸들러
   *
   * WHY?
   * - 모든 입력 값을 하나의 state에서 관리하기 위해 공용 핸들러 사용.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  /**
   * 이미지 업로드(base64 변환)
   *
   * * WHY?
   * - 백엔드에서 최종 이미지 업로드 방식이 정해지지 않아 base64 방식으로 임시 구현.
   * 
   * TODO:
   * - 추후 이미지 전달 방식 수정. 현재 업로드까지 구현힘.
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
   * 저장(등록/수정) 요청
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
        {/* 인풋들 */}
        <label>가게 이름</label>
        <input name="name" value={form.name} onChange={handleChange} />

        <label>대표 메뉴</label>
        <input name="menu" value={form.menu} onChange={handleChange} />

        <label>카테고리</label>
        <input name="category" value={form.category} onChange={handleChange} />

        <label>주소</label>
        <input name="address" value={form.address} onChange={handleChange} />

        <label>전화번호</label>
        <input name="phone" value={form.phone} onChange={handleChange} />

        {/* 위도/경도 */}
        <div className="BakeryForm__half">
          <div>
            <label>위도</label>
            <input name="lat" value={form.lat} onChange={handleChange} />
          </div>
          <div>
            <label>경도</label>
            <input name="lng" value={form.lng} onChange={handleChange} />
          </div>
        </div>

        {/* 이미지 */}
        <label>대표 이미지</label>
        <input type="file" onChange={handleImageChange} />
        {form.image && <img className="BakeryForm__preview" src={form.image} alt="preview" />}

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
