import React, { useEffect, useState } from 'react';
import { roleService } from '../../services/role.service';
import { IRole } from '../../types/role.type';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_ROLE } from '../../routes/paths';

export default function RoleListPage() {
  const navigate = useNavigate();

  const [roleList, setRoleList] = useState<IRole[]>([]);

  useEffect(() => {
    getRoleList();
  }, []);

  const getRoleList = async () => {
    const list = await roleService.getAll();
    if (!list) return;
    setRoleList(list);
  };

  return (
    <>
      <div>
        {roleList.map((item) => (
          <div key={item.id} onClick={() => navigate(`${PATH_ROLE.VIEW}/${item.id}`)}>
            {item.name_en}
          </div>
        ))}
      </div>
      <button onClick={() => navigate(PATH_HOME.HOME)}>To home</button>
      <button onClick={() => navigate(PATH_ROLE.CREATE)}>Create</button>
    </>
  );
}
