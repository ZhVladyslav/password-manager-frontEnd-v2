import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ROLE } from '../../routes/paths';
import { formatDate } from '../../utils/formatDate';

export default function RoleViewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [claimList, setClaimList] = useState<string[]>([]);
  const [role, setRole] = useState<IRoleAndClaims | null>(null);

  useEffect(() => {
    getClaimList();
    getRole();
  }, []);

  const getClaimList = async () => {
    const claimList = await roleService.getClaims();
    if (!claimList) return;
    setClaimList(claimList);
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

  return (
    <>
      <div>
        {claimList.map((item, i) => (
          <div key={i}>
            <span>{item}</span> <br />
          </div>
        ))}
      </div>
      <br />
      {role && <div>{role.name_en}</div>}
      {role && <div>{formatDate(role.createDate)}</div>}
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
    </>
  );
}
