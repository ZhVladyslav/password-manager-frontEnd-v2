import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../services/admin.service';
import { IUserInfo } from '../../types/user.type';
import { formatDate } from '../../utils/formatDate';
import Button from '../../components/Button.component';
import { PATH_ADMIN } from '../../routes/paths';
import { IRole } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { roleToUserService } from '../../services/roleToUser.service';

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<IUserInfo | null>(null);
  const [roleList, setRoleList] = useState<IRole[]>([]);
  const [selectValue, setSelectValue] = useState<string>();

  useEffect(() => {
    getUserInfo();
    getRoleList();
  }, [id]);

  const getUserInfo = async () => {
    if (!id) return;
    const res = await adminService.getUserById(id);
    if (!res) return;
    setUserInfo(res);
    setSelectValue(!res.role ? '' : res.role.id);
  };

  const getRoleList = async () => {
    if (!id) return;
    const res = await roleService.getAll();
    if (!res) return;
    setRoleList(res);
  };

  const submit = async () => {
    if (!id) return;
    if (!userInfo) return;

    if (!selectValue) {
      await roleToUserService.delete({ userId: userInfo.user.id });
      navigate(PATH_ADMIN.USER_LIST);
      return;
    }

    await roleToUserService.set({ roleId: selectValue, userId: userInfo.user.id });
    navigate(PATH_ADMIN.USER_LIST);
  };

  if (!userInfo) return <></>;
  if (!id) return <></>;

  return (
    <>
      <div>
        <Button title="Close" onClick={() => navigate(`${PATH_ADMIN.VIEW_USER_INFO}/${id}`)} />
        <Button title="Update" onClick={submit} />
      </div>

      {/* USER */}
      <div>
        <h2>{userInfo.user.name}</h2>
        <span>{!userInfo.role ? 'null' : userInfo.role.name_en}</span>
        <span>{formatDate(userInfo.user.createDate)}</span>
      </div>

      {/* ROLE */}
      <div>
        <select name="role" id="pet-select" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
          <option value="">--Please choose an option--</option>
          {roleList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name_en}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
