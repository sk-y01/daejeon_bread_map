import React from 'react'
import { MdClose } from "react-icons/md"
import './BakeryDetail.scss'


const BakeryDetail = ({ bakery, onClose }) => {
  const { name, address, phone, category, imageUrl } = bakery;
  
  return (
    <div className="bakeryDetail">
      <div className="bakeryDetail__inner">
        <button 
          onClick={onClose}
          type="button" 
          className="bakeryDetail__close"
          aria-label="닫기"
        >
          <MdClose />
        </button>
        <div className="bakeryDetail__content">
          <h2>{ name }</h2>
          <p>주소: { address } </p>
          <p>전화번호: { phone }</p>
          
          <div>
            {
              category.map(cate => (
                <p key={ cate } className="category">{ cate }</p>
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
    </div>
  )
}

export default BakeryDetail