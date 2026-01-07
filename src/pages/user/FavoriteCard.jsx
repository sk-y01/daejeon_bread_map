/**
 * FavoriteCard.jsx
 *
 * @description
 * 찜한 빵집 카드
 * - 이미지 미연동 → 회색 영역으로 대체
 * - 버튼은 공통 버튼 스타일 사용
 */

import { FiHeart, FiMapPin, FiEdit2, FiTrash2 } from "react-icons/fi";

const FavoriteCard = ({ bakery, memo }) => {
  return (
    <article className="favorite-card">
      {/* 좌측 정보 */}
      <div className="favorite-card__info">
        <h3 className="favorite-card__name">
          {bakery.name}
          <FiHeart className="heart" />
        </h3>

        <p className="favorite-card__address">
          {bakery.address}
        </p>

        <button className="btn__light">
          <FiMapPin /> 지도보기
        </button>

        {memo && (
          <div className="favorite-card__memo">
            <strong>메모</strong>
            <p>{memo}</p>
          </div>
        )}
      </div>

      {/* 우측 이미지 영역 */}
      <div className="favorite-card__images">
        <div className="image-placeholder">이미지 영역</div>
        <div className="image-placeholder">이미지 영역</div>
        <div className="image-placeholder">이미지 영역</div>
      </div>

      {/* 버튼 */}
      <div className="favorite-card__actions">
        <button className="btn__light">
          <FiEdit2 /> 수정
        </button>
        <button className="btn__sub">
          <FiTrash2 /> 삭제
        </button>
      </div>
    </article>
  );
};

export default FavoriteCard;
