import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa";

const BakeryItem = ({ bakery, onBakeryClick }) => {
  const { name, address, phone, category, imageUrl } = bakery;

  const [isLikeActive, setIsLikeActive] = useState(true);

  // 좋아요 버튼 함수수
  const handleLikeBtn = () => {
    setIsLikeActive(active => !active);
  };

  // Bakery Item Click
  const handleBakeryClick = () => {
    if (onBakeryClick) {
      onBakeryClick(bakery);
    }
  }

  return (
    <div className="bakeryItem">
      <div className="bakeryItem__content">
        <h3 onClick={ handleBakeryClick } style={{ cursor:'pointer'}}>{name}</h3>
        <button onClick={ handleLikeBtn } className="btn btn__heart">
          {
            isLikeActive ? <FaRegHeart /> : <FaHeart /> 
          }
        </button>
        <div className="bakeryItem__info">
          <p className="address">{ address }</p>
          <p>{ phone }</p>
          {
            // category는 배열 형태이기 때문에
            category.map(cate => (
              <p key={cate} className="category">{ cate }</p>
            ))
          }
        </div>
        <div className="bakeryItem__thumbnail">
          <ul>
            {
              !imageUrl
              ? (
                <li>
                  <img src="/src/assets/images/main/bakery_img01.png" alt="성심당 본점" />
                </li>
              ) : (
                <li>
                  <img src={ imageUrl } alt={ name } />
                </li>
              )
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BakeryItem
