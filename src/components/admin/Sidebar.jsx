import { NavLink, useLocation } from 'react-router-dom';
import { FaHome, FaUser, FaStore, FaSignOutAlt, FaChartBar } from 'react-icons/fa';

function AdminSidebar() {
  const { pathname } = useLocation();

  const isUser = pathname.startsWith('/admin/users');
  const isBakery = pathname.startsWith('/admin/bakery');

  return (
    <aside className="AdminSidebar">
      <h2 className="AdminSidebar__title">관리자 메뉴</h2>

      <nav className="AdminSidebar__nav">
        {/* 대시보드 */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `AdminSidebar__single ${isActive ? 'active' : ''}`
          }
        >
          {/* <FaHome /> */}
          <FaChartBar />
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
            <li>
              <NavLink to="/admin/bakery/delete-history">삭제 이력</NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* 하단 유저 영역 */}
      <div className="AdminSidebar__user">
        <div className="AdminSidebar__user-info">
          <span>유저정보</span>
        </div>

        <NavLink to="/" className="AdminSidebar__user-link">
        <FaHome />
          메인으로
        </NavLink>

        <button
          type="button"
          className="AdminSidebar__logout"
          onClick={() => console.log('logout')}
        >
          <FaSignOutAlt />
          로그아웃
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
