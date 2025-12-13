import { Link, Outlet } from "react-router-dom"

const PublicLayout = () => {
  return (
    <>
      <header>
        <div className="inner">
          <h2><img src="/src/assets/images/common/logo.svg" alt="" /></h2>
          <div className="gnb">
            <Link to={'/'}>List</Link>
          </div>
        </div>
      </header>
      <main id="main">
        <Outlet />
      </main>
    </>
  )
}

export default PublicLayout