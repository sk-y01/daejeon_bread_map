import SVGImg from '../../assets/images/spinner.svg'
import style from './LoadingSpinner.style.scss'

const LoadingSpinner = () => {
  return (
    <div className={ style.Loading }>
      <img src={ SVGImg } alt="loading" />
    </div>
  )
}

export default LoadingSpinner