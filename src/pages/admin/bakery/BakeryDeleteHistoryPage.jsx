/**
 * BakeryDeleteHistoryPage.jsx
 *
 * @description
 * 관리자용 빵집 삭제 이력 페이지 (UI 선작업)
 *
 * NOTE:
 * - 빵집 리스트와 동일한 카드형 레이아웃 사용
 * - API 연동 전 더미 데이터 사용
 */

import { useEffect, useState } from 'react';

function BakeryDeleteHistoryPage() {
  const [deleteHistories, setDeleteHistories] = useState([]);

  useEffect(() => {
    // TODO: 삭제 이력 API 연동
    setDeleteHistories([
      {
        id: 1,
        name: '성심당 본점',
        reason: '폐업',
        deletedAt: '2025-12-14',
      },
      {
        id: 2,
        name: '빵집 테스트',
        reason: '중복 등록',
        deletedAt: '2025-12-13',
      },
    ]);
  }, []);

  return (
    <div className="BakeryDeleteHistory">
      <h1>빵집 삭제 이력</h1>

      {deleteHistories.length === 0 ? (
        <p>삭제 이력이 없습니다.</p>
      ) : (
        <div className="BakeryDeleteHistory__cards">
          {deleteHistories.map((item) => (
            <div className="BakeryDeleteHistoryCard" key={item.id}>
              <div className="BakeryDeleteHistoryCard__content">
                <h3 className="name">{item.name}</h3>

                <p>
                  <strong>삭제 사유:</strong> {item.reason}
                </p>
                <p>
                  <strong>삭제일:</strong> {item.deletedAt}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BakeryDeleteHistoryPage;
