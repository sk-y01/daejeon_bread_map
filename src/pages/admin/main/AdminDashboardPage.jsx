/**
 * AdminDashboardPage.jsx
 *
 * @description
 * 관리자 대시보드 메인 페이지
 * - 전체 빵집 수
 * - 최근 등록된 빵집
 * - 최근 등록된 빵집 목록(5개)
 *
 * NOTE
 * - 기존 상단 통계 카드는 유지
 * - 하단은 동일한 카드 스타일로 2등분
 */

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBakeries } from '../../../apis/bakeryApi';
import { FaStore } from 'react-icons/fa';

function AdminDashboardPage() {
  const navigate = useNavigate();
  const [bakeries, setBakeries] = useState([]);

  useEffect(() => {
    const loadBakeries = async () => {
      try {
        const res = await fetchBakeries({});
        setBakeries(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error(error);
      }
    };

    loadBakeries();
  }, []);

  const sortedBakeries = [...bakeries].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  const totalBakeries = sortedBakeries.length;
  const latestBakery = sortedBakeries[0];
  const recentBakeries = sortedBakeries.slice(0, 5);

  return (
    <div className="AdminDashboard">
      <h1>관리자 대시보드</h1>

      {/* 기존 상단 통계 카드 (유지) */}
      <div className="AdminDashboard__box">
        <p>
          총 등록된 빵집 수: <strong>{totalBakeries}</strong> 개
        </p>
        <p>
          최근 등록된 빵집:{' '}
          <strong>{latestBakery ? latestBakery.name : '-'}</strong>
        </p>
      </div>

      {/* 하단 2단 레이아웃 */}
      <div className="AdminDashboard__grid">
        {/* 좌측: 최근 등록된 빵집 */}
        <div className="AdminDashboard__box">
          <h2 className="AdminDashboard__section-title">
            최근 등록된 빵집 
            {/* <FaStore />  */}
          </h2>

          <ul className="AdminDashboard__recent-list">
            {recentBakeries.map((item) => (
              <li key={item._id}>
                <span className="name">{item.name}</span>

                <div className="categories">
                  {Array.isArray(item.category) &&
                    item.category.map((cat) => (
                      <span key={cat} className="tag">
                        {cat}
                      </span>
                    ))}
                </div>

                <span className="date">
                  {item.createdAt?.slice(0, 10)}
                </span>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="btn btn__sub"
            onClick={() => navigate('/admin/bakery')}
          >
            더보기
          </button>
        </div>

        {/* 우측 카드 (유지) */}
        <div className="AdminDashboard__box">
          <h2>추가 영역</h2>
          <p>추후 기능 추가 예정</p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
