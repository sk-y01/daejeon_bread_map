import SVGImg from '../../assets/images/spinner.svg'

const LoadingSpinner = () => {
  return (
    <div className="Loading">
      <img src={ SVGImg } alt="loading" />
    </div>
  )
}

export default LoadingSpinner