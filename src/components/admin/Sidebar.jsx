import { Link } from "react-router-dom";
// import "./Sidebar.scss"; // 스타일은 나중에 만들 수 있음

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
            <Link to="/admin/bakery">빵집 관리</Link>
          </li>
          <li>
            {/* <Link to="/login">로그아웃</Link> */}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
