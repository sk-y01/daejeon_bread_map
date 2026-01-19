import React from 'react'
import { MdClose } from "react-icons/md"
import { FaMapMarkerAlt,  FaPhoneAlt, FaRegClock } from "react-icons/fa";
import './BakeryDetail.scss'


const BakeryDetail = ({ bakery, onClose, isSectionVisible = true }) => {
  const { name, address, phone, category, imageUrl } = bakery;
  
  return (
    <div className={ `bakeryDetail ${!isSectionVisible ? 'bakeryDetail--section-hidden' : ''}` }>
      <div className="bakeryDetail__inner">
        <button 
          onClick={ onClose }
          type="button" 
          className="bakeryDetail__close"
          aria-label="닫기"
        >
          <MdClose />
        </button>
        <div className="bakeryDetail__content">
          <h3>{ name }</h3>
          <p><FaMapMarkerAlt /> { address } </p>
          <p><FaPhoneAlt /> { phone }</p>
          <p><FaRegClock /> 10:00 - 20:00</p>
          <div>
            {
              category.map(cate => (
                <p key={ cate } className="category">{ cate }</p>
              ))
            }
          </div>
          <div className="bakeryDetail__thumbnail">
            <ul>
              {
                !imageUrl
                ? (
                  <li>
                    <img src="/images/bakery_img01.png" alt="성심당 본점" />
                  </li>
                ) : (
                  <li>
                    <img src={ imageUrl } alt={ name } />
                  </li>
                )
              }
            </ul>
          </div>
          <div className="bakeryDetail__menus">
            <h4>메뉴</h4>
            <ul className="bakeryDetail__menus__inner">
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
              <li>
                <p><img src="/images/menu_img.jpg" alt="메뉴 이미지" /></p>
                <ul>
                  <li className="menus__title">생딸기 티라미수</li>
                  <li>고소한 마스카포네 크림과 새콤달콤한 딸기의 환상적인 조합🍓 진짜 맛있어요..?</li>
                  <li className="menus__price">9,500원</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BakeryDetail