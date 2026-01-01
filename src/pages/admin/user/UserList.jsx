import { useEffect, useState } from 'react'
import './UserList.style.scss'
import { getUserList } from '../../../apis/user/userApi'

const UserList = ({ title }) => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    const fetchUserList = async () => {
      const response = await getUserList()
          , userData = await response?.data

      setUserList(userData)
    }

    fetchUserList()
  }, [])

  return (
    <div className="UserList">
      <h2 className="title">{ title }</h2>
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
              {
                userList?.map((user, idx) => {
                  return (
                    <tr key={ user._id }>
                      <td>{ idx + 1 }</td>
                      <td>{ user.name }</td>
                      <td>{ user.email }</td>
                      <td>{ user.createdAt }</td>
                      <td>{ user.isAdmin }</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserList