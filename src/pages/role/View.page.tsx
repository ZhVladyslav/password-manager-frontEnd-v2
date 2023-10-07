import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ROLE } from '../../routes/paths';
import { formatDate } from '../../utils/formatDate';

export default function RoleViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [role, setRole] = useState<IRoleAndClaims | null>(null);

  useEffect(() => {
    getRole();
  }, []);

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

  return (
    <>
      {role && (
        <>
          <div>{role.name_en}</div>
          <div>{role.name_ua}</div>
          <div>{role.name_ru}</div>
          <br />
          <div>{role.description_en}</div>
          <div>{role.description_ua}</div>
          <div>{role.description_ru}</div>
          <br />
          <div>{formatDate(role.createDate)}</div>
          <div>{formatDate(role.lastUpdate)}</div>
        </>
      )}
      <br />
      claims:
      {role && (
        <div>
          {role.claims.map((item) => (
            <div key={item.id}>
              <div>
                {item.claim}
                {' - '}
                {formatDate(item.createDate)}
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={editRole}>Edit</button>
      <button onClick={() => navigate(PATH_ROLE.LIST)}>To list</button>
    </>
  );
}
