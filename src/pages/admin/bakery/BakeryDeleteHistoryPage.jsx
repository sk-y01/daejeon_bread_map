/**
 * BakeryDeleteHistoryPage.jsx
 *
 * @description
 * 관리자용 빵집 삭제 이력 페이지
 * - 삭제 이력 조회
 * - 삭제일 기준 최신순 정렬
 * 
 */

import { useEffect, useState } from 'react';
import { fetchDeleteHistoryList } from '../../../apis/bakeryApi';
import { convertDateFormat } from '../../../utils/date';

function BakeryDeleteHistoryPage() {
  const [deleteHistories, setDeleteHistories] = useState([]);

  useEffect(() => {
    /**
     * 삭제 이력 조회
     *
     * WHY?
     * - 삭제일(deletedAt) 기준 최신순으로 정렬
     */
    async function historyData() {
      try {
        const response = await fetchDeleteHistoryList();
        const data = response?.data || [];

        const sortedData = [...data].sort(
          (a, b) => new Date(b.deletedAt) - new Date(a.deletedAt),
        );

        setDeleteHistories(sortedData);
      } catch (error) {
        console.error(error);
        setDeleteHistories([]);
      }
    }

    historyData();
  }, []);

  return (
    <div className="BakeryDeleteHistory">
      <h2>빵집 삭제 이력</h2>

      {deleteHistories.length === 0 ? (
        <p>삭제 이력이 없습니다.</p>
      ) : (
        <div className="BakeryDeleteHistory__cards">
          {deleteHistories.map((item) => (
            <div className="BakeryDeleteHistoryCard" key={item._id}>
              <div className="BakeryDeleteHistoryCard__content">
                <h3 className="name">{item.name}</h3>

                <p>
                  <strong>삭제 사유:</strong> {item.deletedReason}
                </p>
                <p>
                  <strong>삭제일:</strong>{' '}
                  {convertDateFormat(item.deletedAt)}
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
