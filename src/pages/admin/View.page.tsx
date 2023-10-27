import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import { IUserInfo } from '../../types/user.type';
import { formatDate } from '../../utils/formatDate';
import { Block, Button, HeaderBlock, Table } from '../../components';
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
      <HeaderBlock leftSpace={<h2>{userInfo.user.name}</h2>}>
        <Button title="Edit" onClick={() => navigate(`${PATH_ADMIN.EDIT_USER}/${id}`)} />
      </HeaderBlock>

      {/* ROLE AND USER */}
      <Block m="0 0 10px 0 ">
        <Table head={['Role name', 'Create account']} size={{ width: 'calc(100vw - 300px)', height: '200px' }}>
          <tr>
            <td data-size="100px">{userInfo.role ? userInfo.role.name_en : 'null'}</td>
            <td data-size="100px">{formatDate(userInfo.user.createDate)}</td>
          </tr>
        </Table>
      </Block>

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
