import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="AdminSidebar">
      <h2 className="AdminSidebar__title">관리자 메뉴</h2>

      <nav>
        <ul>
          <li>
            <Link to="/admin">대시보드</Link>
          </li>
          <li>
            <Link to="/admin/bakery">빵집 리스트 보기</Link>
          </li>
          <li>
            <Link to="/admin/bakery/form">새 빵집 등록</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;


