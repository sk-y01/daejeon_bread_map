import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();

  // 앞으로 API로 받아올 예정 (현재는 더미)
  const totalBakeries = 12;
  const recentBakery = "성심당 본점";

  return (
    <div className="AdminDashboard">
      <h1>관리자 대시보드</h1>

      <div className="AdminDashboard__box">
        <p>
          총 등록된 빵집 수: <strong>{totalBakeries}</strong> 개
        </p>
        <p>
          최근 등록된 빵집: <strong>{recentBakery}</strong>
        </p>
      </div>

      <div className="AdminDashboard__actions">
        <button onClick={() => navigate("/admin/bakery")}>
          빵집 리스트 보기
        </button>

        <button onClick={() => navigate("/admin/bakery/form")}>
          새 빵집 등록
        </button>
      </div>
    </div>
  );
};

export default MainPage;
