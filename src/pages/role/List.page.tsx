import React, { useEffect, useState } from 'react';
import { roleService } from '../../services/role.service';
import { IRole } from '../../types/role.type';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_ROLE } from '../../routes/paths';
import { Button, HeaderBlock, Table } from '../../components';
import style from './list.page.module.scss';

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
      <HeaderBlock>
        <Button type="submit" title="To create" onClick={() => navigate(PATH_ROLE.CREATE)} />
        <Button type="submit" title="To home" onClick={() => navigate(PATH_HOME.HOME)} />
      </HeaderBlock>

      <div className={style.tableContainer}>
        <Table
          head={['Number', 'Name', 'Description']}
          size={{ width: 'calc(100vw - 300px)', height: 'calc(100vh - 80px)' }}
        >
          {roleList &&
            roleList.map((item, i) => (
              <tr key={item.id}>
                <td>{i + 1}</td>
                <td
                  onClick={() => {
                    navigate(`${PATH_ROLE.VIEW}/${item.id}`);
                  }}
                >
                  {item.name_en}
                </td>
                <td>{item.description_en}</td>
              </tr>
            ))}
        </Table>
      </div>
    </>
  );
}
