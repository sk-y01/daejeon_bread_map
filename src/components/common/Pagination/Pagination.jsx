/**
 * Pagination.jsx
 *
 * @description
 * 공통 페이지네이션 컴포넌트
 * - 서버 기준 페이지네이션 UI
 *
 * @props
 * @param {number} page        현재 페이지
 * @param {number} totalPages  전체 페이지 수
 * @param {function} onChange  페이지 변경 핸들러
 */

import './Pagination.scss';

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="Pagination">
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
      >
        이전
      </button>

      <span>
        {page} / {totalPages}
      </span>

      <button
        type="button"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
      >
        다음
      </button>
    </div>
  );
}

export default Pagination;
