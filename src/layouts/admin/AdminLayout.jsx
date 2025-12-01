import { Outlet } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="AdminLayout__dashboard">
      <aside></aside>
      <main id="main">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout