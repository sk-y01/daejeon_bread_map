import { useNavigate } from 'react-router-dom'
import logoImg from '../../assets/images/login/login_logo.svg'
import './Login.style.scss'

const LoginPage = () => {
  const navigate = useNavigate();
  /**
   * logoClickHandler
   * 
   * @description 클릭 시 메인 화면으로 이동
   */
  const logoClickHandler = () => {
    navigate('/');
  }

  return (
    <div className="Login">
      <div className="Login__form">
        <div className="Login__form-img">
          <img src={ logoImg } alt="logo" />
          <strong onClick={ logoClickHandler }>대전빵지도</strong>
          <span>대전의 맛있는 빵을 만나는 순간들</span>
        </div>
        <form action="">
          
        </form>
      </div>
    </div>
  )
}

export default LoginPage