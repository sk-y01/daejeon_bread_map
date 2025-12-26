import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { validationEmail, validationPassword } from '../../utils/validate';
import { login } from '../../apis/login/loginApi';
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
  // TODO : 로그인하는 것까진 완료 .. 로그인 후 세션 처리 추가할 것
  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    
    try {
      const email = emailValue
          , password = passwordValue
  
      const response = await login({ email, password })

      if (response.status === 200) {
        localStorage.setItem('user', JSON.stringify(response.data))
        navigate('/')
      }
    } catch (error) {
      console.error('로그인인 실패 : ', error)

      if (error.response) {
        console.error('에러 상태 코드 : ', error.response.status)
        console.error('에러 메시지 : ', error.response.data)
      }
    }
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