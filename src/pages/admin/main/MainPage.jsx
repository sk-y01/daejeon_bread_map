/**
 * Admin Main Page (관리자 대시보드)
 *
 * @description
 * 관리자 전용 첫 화면으로, 등록된 빵집 수 / 최근 등록된 빵집 등
 * 간단한 통계 정보를 보여주고 주요 메뉴로 이동할 수 있는 페이지.
 *
 * WHY?
 * - 관리자 UX의 진입점을 담당하므로 단순·명확한 구성 유지가 중요함.
 * - 향후 실제 API로 데이터 연동되기 전에 더미값으로 화면 형태부터 구축.
 *
 * TODO:
 * - 백엔드 API 연동 후 total / recent 데이터 실제값으로 적용해야 함.
 */

import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  /** 
   * NOTE
   * 현재는 더미 데이터 사용. 
   * WHY?
   * - 화면 구조만 먼저 구성, 추후 API 사용.
   */
  const totalBakeries = 10;
  const recentBakery = "성심당 본점";

  return (
    <div className="AdminDashboard">
      <h1>관리자 대시보드</h1>

      {/* 통계 영역 */}
      <div className="AdminDashboard__box">
        <p>
          총 등록된 빵집 수: <strong>{totalBakeries}</strong> 개
        </p>
        <p>
          최근 등록된 빵집: <strong>{recentBakery}</strong>
        </p>
      </div>

      {/* 이동 버튼 */}
      <div className="AdminDashboard__actions">
        <button 
          className="btn btn__sub--rounded"
          onClick={() => navigate("/admin/bakery")}
        >
          빵집 리스트 보기/수정
        </button>

        <button 
          className="btn btn__sub--rounded"
          onClick={() => navigate("/admin/bakery/form")}
        >
          빵집 등록
        </button>
      </div>
    </div>
  );
};

export default MainPage;
