import React, { useEffect, useState } from 'react';
import { roleService } from '../../services/role.service';
import { IRole } from '../../types/role.type';
import { useNavigate } from 'react-router-dom';
import { PATH_ROLE } from '../../routes/paths';

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
          <span key={item.id} onClick={() => navigate(`${PATH_ROLE.VIEW}/${item.id}`)}>
            {item.name_en}
          </span>
        ))}
      </div>
    </>
  );
}
