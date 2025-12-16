import React from 'react'
import { FaHeart } from "react-icons/fa";

const BakeryItem = ({ bakery }) => {
  const { name, address, phone, latitude, longitude, category } = bakery;

  return (
    <div className="bakeryItem">
      <div className="bakeryItem__content">
        <h3>{name}</h3>
        <button className="btn btn__heart"><FaHeart /></button>
        <div className="bakeryItem__info">
          <p>{ address }</p>
          <p>{ phone }</p>
          <p>{ category }</p>
          <p>{ latitude }</p>
          <p>{ longitude }</p>
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
