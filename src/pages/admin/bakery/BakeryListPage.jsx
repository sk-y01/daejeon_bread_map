/**
 * BakeryListPage.jsx
 *
 * @description
 * 관리자용 빵집 목록 페이지.
 * 목록 조회는 초기 렌더링 시 1회 실행하며,
 * 삭제 후에는 목록을 다시 불러와 리스트를 최신 상태로 유지한다.
 *
 */

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBakeries, deleteBakery } from "../../../apis/bakeryApi";

function BakeryListPage() {
  const navigate = useNavigate();

  const [bakeries, setBakeries] = useState([]);
  const [loading, setLoading] = useState(true);

  /**
   * 초기 목록 로딩
   *
   * WHY?
   * - 페이지가 열리면 항상 최신 데이터를 보게 하기 위해.
   */
  useEffect(() => {
    loadList();
  }, []);

  /**
   * 빵집 목록 불러오기
   *
   * WHY?
   * - 삭제, 등록 후에도 재사용 가능하도록 별도 함수로 분리.
   */
  const loadList = async () => {
    try {
      setLoading(true);
      const res = await fetchBakeries();
      setBakeries(res.data);

    } catch (err) {
      console.error(err);
      alert("목록 불러오기 실패");

    } finally {
      setLoading(false);
    }
  };

  /**
   * 삭제 요청
   *
   * WHY?
   * - 삭제 후 목록 재조회가 필요해 일관된 UX 유지.
   */
  const handleDelete = async (id) => {
    if (!window.confirm("정말 삭제할까요?")) return;

    try {
      await deleteBakery(id);
      alert("삭제 완료!");

      loadList(); // TODO: 페이지네이션 구현 시 구조 변경 가능

    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };

  return (
    <div className="BakeryList">
      <h1>빵집 목록</h1>

      <div className="BakeryList__actions">
        <button onClick={() => navigate("/admin/bakery/form")}>
          새 빵집 등록
        </button>
      </div>

      {loading ? (
        <p>로딩 중...</p>
      ) : bakeries.length === 0 ? (
        <p>등록된 빵집이 없습니다.</p>
      ) : (
        <ul>
          {bakeries.map((item) => (
            <li key={item.id}>
              {item.name} ({item.category})
              <div className="BakeryList__buttons">
                <button onClick={() => navigate(`/admin/bakery/form/${item.id}`)}>
                  수정
                </button>
                <button className="delete" onClick={() => handleDelete(item.id)}>
                  삭제
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BakeryListPage;
