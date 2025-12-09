import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="AdminLayout">
      <Sidebar />

      <main className="AdminLayout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
