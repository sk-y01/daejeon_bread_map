import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="header">
      <div className="inner">
        <div className="header__content">
          <h1 className="header__logo">
            <Link to="/">
              <img src="/images/logo.svg" alt="대전 빵 지도" /> 
              <span>대전빵지도</span>
            </Link>
          </h1>
          {/* <nav className="haeder_nav">
            <ul className="header__menu">
              <li>
                <Link to="/">
                  <span></span>
                  <span></span>
                  <span></span>
                </Link>
              </li>
            </ul>
          </nav> */}
        </div>
      </div>
    </header>
  )
}

export default Header