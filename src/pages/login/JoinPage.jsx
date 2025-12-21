import React, { Suspense, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../components/loading/LoadingSpinner'
import logoImg from '../../assets/images/login/login_logo.svg'
import './Login.style.scss'
import { validationEmail, validationPassword, validationPasswordConfirm } from '../../utils/validate'
import { join } from '../../apis/login/loginApi'

const JoinPage = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [passwordConfirmValue, setPasswordConfirmValue] = useState('')
  const [passwordConfirmError, setPasswordConfirmError] = useState('')
  const [nicknameValue, setNicknameValue] = useState('')
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
   * handlerEmailValidation
   * 
   * @description 이메일 검증
   * @returns 
   */
  const handleEmailValidation = () => {
    const result = validationEmail(emailValue)
    setEmailError(result.errorMessage)

    return result.isValid
  }

  /**
   * handlePwdValidation
   * 
   * @description 비밀번호 검증
   * @returns 
   */
  const handlePwdValidation = () => {
    const result = validationPassword(passwordValue)
    setPwdError(result.errorMessage)

    return result.isVaild
  }

  /**
   * joinSubmitHandler
   * 
   * @description  회원가입
   * @param {*} e  이벤트 객체
   */
  const joinSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const name = nameValue
          , email = emailValue
          , password = passwordValue
          , nickname = nicknameValue

      const response = await join({ name, email, password, nickname })
  
      // 201 코드 시, login 화면으로 이동
      if (response.status === 201) {
        navigate('/login')
      }
    } catch (error) {
      console.error('회원가입 실패 : ', error)

      if (error.response) {
        console.error('에러 상태 코드 : ', error.response.status)
        console.error('에러 메시지 : ', error.response.data)
      }
    }
  }

  // 회원가입 시 검증 항목
  // 1. 비밀번호 영문, 숫자, 특수문자 조합 8자 ~ 15자 및 비밀번호 검증에 통과
  // 2. 비밀번호와 비밀번호 확인이 일치
  const handlePwdCnfrmValidation = () => {
    const result = validationPasswordConfirm(passwordValue, passwordConfirmValue)
    setPasswordConfirmError(result.errorMessage)

    return result.isVaild
  }
  // 3. 아이디 입력 시, @breadmap.co.kr 과 자동 문자 결합
  const handleEmailChange = (e) => {
    let inputValue = e.target.value

    // @breadmap.co.kr이 이미 포함되어 있지 않은 경우에만 자동 추가
    if (inputValue && !inputValue.includes('@breadmap.co.kr')) {
      // 사용자가 @를 입력하면 자동으로 breadmap.co.kr 추가
      if (inputValue.endsWith('@')) {
        inputValue = inputValue + 'breadmap.co.kr'
      }
    }
    setEmailValue(inputValue)
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
                value={ nameValue }
                onChange={ (e) => setNameValue(e.target.value) }
                placeholder='이름'
                autoComplete='off'
                minLength={3}
                required
              />
            </div>
            <div className="Login__form-item">
              <input 
                type="text" 
                name="userId" 
                id="userId"
                value={ emailValue }
                onChange={ handleEmailChange }
                onBlur={ handleEmailValidation }
                autoComplete='off'
                placeholder='이메일'
                required
              />
              {
                // 이메일 검증 후 잘못 입력 시 표출
                emailError && (
                  <span className='is-error'>
                    { emailError }
                  </span>
                )
              }
            </div>
            <div className="Login__form-item">
              <input 
                type="password" 
                name="password" 
                id="password"
                onChange={ (e) => setPasswordValue(e.target.value) }
                onBlur={ handlePwdValidation }
                autoComplete='off'
                placeholder='비밀번호'
                minLength={8}
                maxLength={15}
                required
              />
              {
                pwdError && (
                  <span className='is-error'>
                    { pwdError }
                  </span>
                )
              }
            </div>
            <div className="Login__form-item">
              <input 
                type="password" 
                name="passwordCnfrm" 
                id="passwordCnfrm"
                value={passwordConfirmValue}
                onChange={ (e) => setPasswordConfirmValue(e.target.value) }
                onBlur={ handlePwdCnfrmValidation }
                autoComplete='off'
                placeholder='비밀번호 확인'
                minLength={8}
                maxLength={15}
                required
              />
              {
                passwordConfirmError && (
                  <span className='is-error'>
                    { passwordConfirmError }
                  </span>
                )
              }
            </div>
            <div className="Login__form-item">
              <input 
                type="text" 
                name="nickname" 
                id="nickname"
                value={ nicknameValue }
                onChange={ (e) => setNicknameValue(e.target.value) }
                placeholder='별명'
                autoComplete='off'
                required
              />
            </div>
            <div className="Login__form-btn-wrap">
              <button type="submit" className="btn btn__login">회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default JoinPage