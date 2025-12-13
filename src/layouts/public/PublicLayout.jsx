import { Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <>
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout