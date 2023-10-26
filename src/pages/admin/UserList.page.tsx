import React, { useEffect, useState } from 'react';
import { adminService } from '../../services/admin.service';
import Button from '../../components/Button.component';
import style from './userList.page.module.scss';
import Table from '../../components/Table.component';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import { PATH_ADMIN, PATH_USER } from '../../routes/paths';
import { IUserList } from '../../types/user.type';

export default function UserListPage() {
  const navigate = useNavigate();

  const [list, setList] = useState<IUserList[]>([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const result = await adminService.userList();
    if (!result) return;
    setList(result);
  };

  return (
    <>
      <div className={style.main}></div>
      <Table
        head={['Number', 'Name', 'Role', 'Sessions', 'Login date']}
        size={{ width: 'calc(100vw - 300px)', height: 'calc(100vh - 20px)' }}
      >
        {list.map((item, i) => (
          <tr key={i}>
            <td data-size="100px">{i + 1}</td>
            <td data-size="200px" onClick={() => navigate(`${PATH_ADMIN.VIEW_USER_INFO}/${item.user.id}`)}>
              {item.user.name}
            </td>
            <td data-size="200px">{item.role ? item.role.name_en : 'null'}</td>
            <td data-size="100px">{item.sessionsQuantity}</td>
            <td data-size="150px">{formatDate(item.user.createDate)}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
