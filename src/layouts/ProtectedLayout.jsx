import { Children } from "react"
import { Navigate } from "react-router-dom"

const ProtectedLayout = ({ children }) => {
  const user = localStorage.getItem('user')

  if (!user) {
    // 로그인 되어 있지 않을 경우, 로그인 페이지로 리다이렉트
    return <Navigate to='/login' replace />
  }

  return children
}

export default ProtectedLayout