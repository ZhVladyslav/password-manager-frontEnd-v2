import React, { useEffect, useState } from 'react';
import { roleService } from '../../services/role.service';
import { IRole } from '../../types/role.type';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME, PATH_ROLE } from '../../routes/paths';
import Button from '../../components/Button.component';
import style from './list.page.module.scss';
import Table from '../../components/Table.component';

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
      <div className={style.contentContainer}>
        <div className={style.buttonContainer}>
          <Button type="submit" title="To create" onClick={() => navigate(PATH_ROLE.CREATE)} />
          <Button type="submit" title="To home" onClick={() => navigate(PATH_HOME.HOME)} />
        </div>

        <div className={style.tableContainer}>
          <Table head={['Name']}>
            {roleList &&
              roleList.map((item) => (
                <tr key={item.id}>
                  <td
                    onClick={() => {
                      navigate(`${PATH_ROLE.VIEW}/${item.id}`);
                    }}
                  >
                    {item.name_en}
                  </td>
                </tr>
              ))}
          </Table>
        </div>
      </div>
    </>
  );
}
