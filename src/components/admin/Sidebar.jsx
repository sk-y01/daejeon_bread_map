import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaStore, FaPlusSquare } from 'react-icons/fa';

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="AdminSidebar">
      <h2 className="AdminSidebar__title">관리자 메뉴</h2>

      <nav>
        <ul>
          <li>
            <Link
              to="/admin"
              className={`AdminSidebar__item ${
                location.pathname === '/admin' ? 'is-active' : ''
              }`}
            >
              <FaHome />
              <span>대시보드</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/bakery"
              className={`AdminSidebar__item ${
                location.pathname.startsWith('/admin/bakery') &&
                !location.pathname.includes('form')
                  ? 'is-active'
                  : ''
              }`}
            >
              <FaStore />
              <span>빵집 리스트</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/bakery/form"
              className={`AdminSidebar__item ${
                location.pathname.includes('/admin/bakery/form')
                  ? 'is-active'
                  : ''
              }`}
            >
              <FaPlusSquare />
              <span>새 빵집 등록</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
