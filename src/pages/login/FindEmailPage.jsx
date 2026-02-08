import { useNavigate } from 'react-router-dom';
import logoImg from '../../assets/images/login/login_logo.svg'
import './Login.style.scss'

const FindEmailPage = () => {
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
   * moveLoginClickHandler
   * 
   * @description 클릭 시 로그인 화면으로 이동
   */
  const moveLoginClickHandler = () => {
    navigate('/login')
  }

  return (
    <div className="FindEmail Login">
      <div className="Login__form">
        <div className="Login__form-img">
          <img src={ logoImg } alt="logo" />
          <strong onClick={ logoClickHandler }>대전빵지도</strong>
          <span>대전의 맛있는 빵을 만나는 순간들</span>
        </div>
        <form action="">
          <div className="Login__form-item">
            <input
              type="text"
              name="name"
              id='name'
              placeholder='이름'
              autoComplete='off'
              required
            />
          </div>
          <div className="Login__form-item">
            <input
              type="text"
              name="nickname"
              id='nickname'
              placeholder='닉네임'
              autoComplete='off'
              required
            />
          </div>
          <div className="Login__form-btn-wrap">
            <button 
              type="submit"
              className="btn btn__login"
            >
              이메일 찾기
            </button>
            <button
              type="button"
              className='btn btn__link'
              onClick={ moveLoginClickHandler }  
            >
                로그인 페이지로 이동
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FindEmailPage