import React from 'react'
import LikeComp from './LikeComp';

const BakeryItem = ({ bakery, onBakeryClick }) => {
  const { name, address, phone, category, imageUrl } = bakery;

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
        <LikeComp />
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
                  <img src="/bakery_img01.png" alt="성심당 본점" />
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
