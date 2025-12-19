import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { validationEmail, validationPassword } from '../../utils/validate';
import LoadingSpinner from '../../components/loading/LoadingSpinner'
import logoImg from '../../assets/images/login/login_logo.svg'
import './Login.style.scss'

const LoginPage = () => {
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [emailError, setEmailError] = useState('')
  const [pwdError, setPwdError] = useState('')

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
   * 로그인 핸들러
   * 
   * @param {*} e   이벤트 객체
   */
  const loginSubmitHandler = (e) => {
    e.preventDefault();

    const email = emailValue
        , password = passwordValue

    console.log('email, password : ', email, password)
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
          <form action="" onSubmit={ loginSubmitHandler }>
            <div className="Login__form-item">
              <input 
                type="text" 
                name="email" 
                id="email"
                value={ emailValue }
                onChange={ (e) => setEmailValue(e.target.value) }
                onBlur={ handleEmailValidation }
                placeholder='이메일'
                autoComplete='off'
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
                placeholder='비밀번호'
                autoComplete='off'
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
            <div className="Login__form-btn-wrap">
              <button type="submit" className="btn btn__login">로그인</button>
              <button 
                type="button" 
                className="btn btn__join"
                onClick={ () => navigate('/join') }
              >회원가입</button>
            </div>
          </form>
        </div>
      </div>
    </Suspense>
  )
}

export default LoginPage