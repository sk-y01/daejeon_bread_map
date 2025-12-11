/**
 * BakeryListPage.jsx
 *
 * @description
 * 관리자용 빵집 목록 페이지.
 * 조회 / 수정 / 삭제
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBakeries, deleteBakery } from "../../../apis/bakeryApi";

function BakeryListPage() {
  const navigate = useNavigate();

  /**
   * @state bakeries
   * @description 조회된 빵집 목록 데이터 저장
   */
  const [bakeries, setBakeries] = useState([]);

  /**
   * @state loading
   * @description 목록 로딩 여부 표시
   */
  const [loading, setLoading] = useState(true);

  /**
   * 초기 목록 로드
   *
   * @description
   * 페이지가 처음 렌더링될 때 최신 데이터를 불러옴.
   */
  useEffect(() => {
    loadList();
  }, []);

  /**
   * loadList
   *
   * @description
   * 등록/수정/삭제 후에도 재사용되는 공통 목록 조회 함수.
   *
   * WHY?
   * - UI 일관성을 유지하고 불필요한 중복 코드를 방지하기 위함.
   */
  const loadList = async () => {
    try {
      setLoading(true);
      const res = await fetchBakeries();
      setBakeries(res.data.list || []);
    } catch (err) {
      console.error(err);
      alert("목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * handleDelete
   *
   * @description 선택한 빵집 정보를 삭제하고 목록을 다시 조회함.
   * WHY?
   * - 삭제 후 즉시 반영된 UI를 보여 사용자 경험을 유지하기 위함.
   */
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;

    try {
      await deleteBakery(id);
      alert("삭제 완료!");
      loadList();
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  return (
    <div className="BakeryList">
      <h1>빵집 리스트</h1>

      {/* 상단 빵집등록 버튼 */}
      <div className="BakeryList__actions">
        <button
          type="button"
          className="btn btn__sub"
          onClick={() => navigate("/admin/bakery/form")}
        >
          새 빵집 등록
        </button>
      </div>

      {/* 로딩 상태 */}
      {loading ? (
        <p>로딩 중...</p>
      ) : bakeries.length === 0 ? (
        <p>등록된 빵집이 없습니다.</p>
      ) : (
        <div className="BakeryList__cards">
          
          {/* 빵집 카드 리스트 */}
          {bakeries.map((item) => (
            <div className="BakeryCard" key={item.id}>

              {/* 이미지 영역 */}
              <div className="BakeryCard__thumbnail">
                {item.image ? (
                  <img src={item.image} alt={item.name} />
                ) : (
                  <div className="thumbnail__placeholder">이미지 없음</div>
                )}
              </div>

              {/* 텍스트 정보 */}
              <div className="BakeryCard__content">
                <h3>{item.name}</h3>
                <p className="info"><strong>카테고리:</strong> {item.category}</p>
                <p className="info"><strong>대표 메뉴:</strong> {item.menu}</p>
                <p className="info"><strong>주소:</strong> {item.address}</p>
                <p className="info"><strong>전화번호:</strong> {item.tel}</p>
                <p className="coords">
                  <strong>위도/경도:</strong> {item.lat}, {item.lng}
                </p>
              </div>

              {/* 수정, 삭제 버튼 */}
              <div className="BakeryCard__buttons">
                <button
                  type="button"
                  className="btn btn__light"
                  onClick={() => navigate(`/admin/bakery/form/${item.id}`)}
                >
                  수정
                </button>
                <button
                  type="button"
                  className="btn btn__sub"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BakeryListPage;
