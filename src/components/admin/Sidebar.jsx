import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaStore } from 'react-icons/fa';

function AdminSidebar() {
  const { pathname } = useLocation();

  const isUser = pathname.startsWith('/admin/users');
  const isBakery = pathname.startsWith('/admin/bakery');

  return (
    <aside className="AdminSidebar">
      <h2 className="AdminSidebar__title">관리자 메뉴</h2>

      <nav className="AdminSidebar__nav">
        {/* 대시보드 (exact) */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `AdminSidebar__single ${isActive ? 'active' : ''}`
          }
        >
          <FaHome />
          <span>대시보드</span>
        </NavLink>

        {/* 회원 관리 */}
        <div className={`AdminSidebar__group ${isUser ? 'active' : ''}`}>
          <div className="AdminSidebar__group-title">
            <FaUser />
            <span>회원 관리</span>
          </div>
          <ul className="AdminSidebar__submenu">
            <li>
              <NavLink to="/admin/users">회원 목록</NavLink>
            </li>
          </ul>
        </div>

        {/* 빵집 관리 */}
        <div className={`AdminSidebar__group ${isBakery ? 'active' : ''}`}>
          <div className="AdminSidebar__group-title">
            <FaStore />
            <span>빵집 관리</span>
          </div>
          <ul className="AdminSidebar__submenu">
            <li>
              <NavLink to="/admin/bakery" end>
                빵집 목록 조회
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/bakery/form">빵집 등록</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
