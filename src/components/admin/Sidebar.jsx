import { forwardRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaUser,
  FaStore,
  FaSignOutAlt,
  FaChartBar,
} from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const AdminSidebar = forwardRef(({ isOpen, onClose }, ref) => {
  const { pathname } = useLocation();

  const isUser = pathname.startsWith('/admin/users');
  const isBakery = pathname.startsWith('/admin/bakery');

  return (
    <aside
      ref={ref}
      className={`AdminSidebar ${isOpen ? 'is-open' : ''}`}
    >
      {/* ===== 사이드바 헤더 (관리자 메뉴 + 닫기 버튼) ===== */}
      <div className="AdminSidebar__header">
        <h2 className="AdminSidebar__title">관리자 메뉴</h2>

        <button
          type="button"
          className="AdminSidebar__close"
          onClick={onClose}
          aria-label="사이드바 닫기"
        >
          <IoClose />
        </button>
      </div>

      {/* ===== 네비게이션 ===== */}
      <nav className="AdminSidebar__nav">
        {/* 대시보드 */}
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `AdminSidebar__single ${isActive ? 'active' : ''}`
          }
        >
          <FaChartBar />
          대시보드
        </NavLink>

        {/* 회원 관리 */}
        <div className={`AdminSidebar__group ${isUser ? 'active' : ''}`}>
          <div className="AdminSidebar__group-title">
            <FaUser />
            회원 관리
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
            빵집 관리
          </div>
          <ul className="AdminSidebar__submenu">
            <li>
              <NavLink to="/admin/bakery" end>
                빵집 목록 조회
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/bakery/form">
                빵집 등록
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/bakery/delete-history">
                삭제 이력
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      {/* ===== 하단 유저 영역 ===== */}
      <div className="AdminSidebar__user">
        <NavLink to="/" className="AdminSidebar__user-link">
          <FaHome />
          메인으로
        </NavLink>

        {/* TODO: 로그아웃 API 연동 */}
        <button type="button" className="AdminSidebar__logout">
          <FaSignOutAlt />
          로그아웃
        </button>
      </div>
    </aside>
  );
});

export default AdminSidebar;
