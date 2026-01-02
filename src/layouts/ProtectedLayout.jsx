import { Navigate, useLocation } from "react-router-dom"

const ProtectedLayout = ({ children }) => {
  const user = localStorage.getItem('user')
      , location = useLocation()

  if (!user) {
    // 로그인 되어 있지 않을 경우, 로그인 페이지로 리다이렉트
    return <Navigate to='/login' replace />
  }

  let isAdmin = false
  try {
    // user 존재할 경우 파싱해서 isAdmin 확인
    const userData = JSON.parse(user)
    isAdmin = userData?.user?.isAdmin || false
  } catch (error) {
    console.error('사용자 정보 파싱 오류 : ', error)

    return <Navigate to='/login' replace />
  }

  if (location.pathname.startsWith('/admin') && !isAdmin) {
    return <Navigate to='/mypage' replace />
  }

  return children
}

export default ProtectedLayout