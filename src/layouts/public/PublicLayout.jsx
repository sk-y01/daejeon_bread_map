import { Outlet } from "react-router-dom"
import Header from "../../components/layout/Header"

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout