import React, { Suspense } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/loading/LoadingSpinner'
import logoImg from '../../assets/images/login/login_logo.svg'
import './Login.style.scss'

const JoinPage = () => {
  const navigate = useNavigate();
  /**
   * logoClickHandler
   * 
   * @description 클릭 시 메인 화면으로 이동
   */
  const logoClickHandler = () => {
    navigate('/');
  }

  /**
   * joinSubmitHandler
   * 
   * @description  회원가입
   * @param {*} e  이벤트 객체
   */
  const joinSubmitHandler = (e) => {
    e.preventDefault();
  }

  return (
    <Suspense fallback={ <LoadingSpinner /> }>
      <div className="Login">
        <div className="Login__form">
          <div className="Login__form-img">
            <img src={ logoImg } alt="logo" />
            <strong onClick={ logoClickHandler }>대전빵지도</strong>
            <span>대전의 맛있는 빵을 만나는 순간들</span>
          </div>
          <form action="" onSubmit={ joinSubmitHandler }>
          <div className="Login__form-item">
              <input 
                type="text" 
                name="name" 
                id="name"
                placeholder='이름'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-item">
              <input 
                type="text" 
                name="id" 
                id="id"
                placeholder='아이디'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-item">
              <input 
                type="password" 
                name="password" 
                id="password"
                placeholder='비밀번호'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-item">
              <input 
                type="password" 
                name="passwordCnfrm" 
                id="passwordCnfrm"
                placeholder='비밀번호 확인'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-item">
              <input 
                type="text" 
                name="nickname" 
                id="nickname"
                placeholder='별명'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-btn-wrap">
              <button type="button" className="btn btn__login">회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default JoinPage