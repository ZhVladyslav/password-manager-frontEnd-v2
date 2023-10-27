import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import { IUserInfo } from '../../types/user.type';
import { formatDate } from '../../utils/formatDate';
import { Button, Table } from '../../components';
import { PATH_ADMIN } from '../../routes/paths';

export default function UserViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    if (!id) return;
    const res = await adminService.getUserById(id);
    if (!res) return;
    setUserInfo(res);
  };

  if (!userInfo) return <></>;
  if (!id) return <></>;

  return (
    <>
      <div>
        <Button title="Edit" onClick={() => navigate(`${PATH_ADMIN.EDIT_USER}/${id}`)} />
      </div>

      {/* USER */}
      <div>
        <h2>{userInfo.user.name}</h2>
        <span>{!userInfo.user.role_id ? 'null' : userInfo.user.role_id}</span>
        <span>{formatDate(userInfo.user.createDate)}</span>
      </div>

      {/* ROLE */}
      <div>
        {userInfo.role && (
          <>
            <h2>{userInfo.role.name_en}</h2>
          </>
        )}
      </div>

      {/* SESSIONS */}
      <Table head={['Number', 'Create date', 'Expire date']} size={{ width: 'calc(100vw - 300px)', height: '200px' }}>
        {userInfo.sessions.map((item, i) => (
          <tr key={i}>
            <td data-size="100px">{i + 1}</td>
            <td data-size="200px">{formatDate(item.createDate)}</td>
            <td data-size="200px">{formatDate(item.expDate)}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
