import SVGImg from '../../assets/images/spinner.svg'
import './LoadingSpinner.style.scss'

const LoadingSpinner = () => {
  return (
    <div className="Loading">
      <img src={ SVGImg } alt="loading" />
    </div>
  )
}

export default LoadingSpinner