import { useEffect, useState } from 'react';
import './UserList.style.scss';
import { getUserList } from '../../../apis/user/userApi';
import { convertDateFormat } from '../../../utils/date';
import { MdOutlineSearch } from 'react-icons/md';

const UserList = ({ title }) => {
  const [userList, setUserList] = useState([]);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const fetchUserList = async () => {
      const response = await getUserList(),
        userData = await response?.data;

      setUserList(userData);
    };

    fetchUserList();
  }, []);

  /**
   * 관리자 참/거짓 'Y/F'로 변환 메서드
   *
   * @param { String } value
   * @returns
   */
  const convertBooleanFormat = (value) => {
    if (value === true) {
      return 'Y';
    } else {
      return 'F';
    }
  };

  /* 검색 필터 */
  const filteredUsers = userList.filter(
    (user) =>
      user.name.includes(keyword) ||
      user.email.includes(keyword),
  );

  return (
    <div className="UserList">
      <h2 className="title">{title}</h2>

      {/* 검색 영역 */}
      <div className="UserList__search">
        <div className="icon__input">
          <button
            type="button"
            className="icon__input-icon"
            aria-label="검색"
          >
            <MdOutlineSearch />
          </button>
          <input
            type="text"
            placeholder="이름 또는 이메일 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </div>

      <div className="UserList__content">
        <div className="table__wrap">
          <table>
            <thead>
              <tr>
                <th>순번</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입 일자</th>
                <th>관리자 여부</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, idx) => (
                <tr key={user._id}>
                  <td className="text--center">{idx + 1}</td>
                  <td className="text--center">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="text--center">
                    {convertDateFormat(user.createdAt)}
                  </td>
                  <td className="text--center">
                    {convertBooleanFormat(user.isAdmin)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
