import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ROLE } from '../../routes/paths';
import { formatDate } from '../../utils/formatDate';
import style from './view.page.module.scss';
import Button from '../../components/Button.component';
import Table from '../../components/Table.component';

export default function RoleViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState<IRoleAndClaims | null>(null);
  const [claimList, setClaimList] = useState<string[]>([]);

  useEffect(() => {
    getClaimList();
    getRole();
  }, []);

  const getClaimList = async () => {
    const list = await roleService.getClaims();
    if (!list) return;
    setClaimList(list);
  };

  const getRole = async () => {
    if (!id) return;
    const roleInDb = await roleService.getById({ id });
    if (!roleInDb) return;
    setRole(roleInDb);
  };

  const editRole = () => {
    if (!role) return;
    navigate(`${PATH_ROLE.EDIT}/${role.id}`);
  };

  if (!id) return <Navigate to={PATH_ROLE.LIST} />;

  if (!role) return <></>;

  return (
    <>
      <div className={style.buttonContainer}>
        <Button title="Edit" onClick={editRole} />
        <Button title="To list" onClick={() => navigate(PATH_ROLE.LIST)} />
      </div>

      <Table
        head={['', 'EN', 'UA', 'RU', 'Last update', 'Created']}
        size={{ width: 'calc(100vw - 300px)', height: '200px' }}
      >
        <tr>
          <td data-size="100px">Name</td>
          <td data-size="200px">{role.name_en}</td>
          <td data-size="200px">{role.name_ua}</td>
          <td data-size="200px">{role.name_ru}</td>
          <td data-size="200px">{formatDate(role.createDate)}</td>
          <td data-size="200px">{formatDate(role.lastUpdate)}</td>
        </tr>
        <tr>
          <td data-size="100px">Description</td>
          <td data-size="200px">{role.description_en}</td>
          <td data-size="200px">{role.description_ua}</td>
          <td data-size="200px">{role.description_ru}</td>
          <td data-size="200px"></td>
          <td data-size="200px"></td>
        </tr>
      </Table>

      <div className={style.claimContainer}>
        <div>
          {claimList.map((item, i) => {
            const roleClaims = role.claims.map((roleItem) => roleItem.claim);

            return (
              <div key={i} className={style[roleClaims.includes(item) ? 'access' : 'close']}>
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
