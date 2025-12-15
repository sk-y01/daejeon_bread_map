import React from 'react'
import { FaHeart } from "react-icons/fa";

function BakeryItem() {
  return (
    <div className="bakeryItem">
      <div className="bakeryItem__content">
        <h3>성심당 본점</h3>
        <button className="btn btn__heart"><FaHeart /></button>
        <div className="bakeryItem__info">
          <p>대전 중구 대종로 480번길 15</p>
          <p>영업 중 22:00에 영업종료</p>
        </div>
        <div className="bakeryItem__thumbnail">
          <ul>
            <li>
              <img src="/src/assets/images/main/bakery_img01.png" alt="성심당 본점" />
            </li>
            <li>
              <img src="/src/assets/images/main/bakery_img02.png" alt="성심당 본점" />
            </li>
            <li>
              <img src="/src/assets/images/main/bakery_img03.png" alt="성심당 본점" />
            </li>
            <li>
              <img src="/src/assets/images/main/bakery_img03.png" alt="성심당 본점" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BakeryItem
