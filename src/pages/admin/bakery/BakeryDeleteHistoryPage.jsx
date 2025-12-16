/**
 * BakeryDeleteHistoryPage.jsx
 *
 * @description
 * 관리자용 빵집 삭제 이력 페이지
 * - 삭제된 빵집 목록 조회
 * - 현재는 UI만 구성 (API 연동 전)
 */

function BakeryDeleteHistoryPage() {
  return (
    <div className="BakeryDeleteHistory">
      <h1>빵집 삭제 이력</h1>

      <div className="BakeryDeleteHistory__list">
        {/* 삭제 이력 카드 (mock) */}
        <div className="BakeryDeleteHistory__card">
          <h3>성심당 본점</h3>
          <p>카테고리: 베이커리, 디저트</p>
          <p>삭제 사유: 중복 등록</p>
          <p>삭제 일자: 2025-12-14</p>
        </div>
      </div>
    </div>
  );
}

export default BakeryDeleteHistoryPage;
