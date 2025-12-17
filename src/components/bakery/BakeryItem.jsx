import React from 'react'
import { FaHeart } from "react-icons/fa";

const BakeryItem = ({ bakery }) => {
  const { name, address, phone, category, imageUrl } = bakery;

  return (
    <div className="bakeryItem">
      <div className="bakeryItem__content">
        <h3>{name}</h3>
        <button className="btn btn__heart"><FaHeart /></button>
        <div className="bakeryItem__info">
          <p>{ address }</p>
          <p>{ phone }</p>
          <p>{ category }</p>
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
