import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ERROR, PATH_ROLE } from '../../routes/paths';
import { uuid } from '../../utils/uuid';
import { formatDate } from '../../utils/formatDate';

export default function RoleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [claimList, setClaimList] = useState<string[]>([]);
  const [role, setRole] = useState<IRoleAndClaims | null>(null);
  const [roleClaims, setRoleClaims] = useState<string[]>([]);

  useEffect(() => {
    if (!id || !uuid.check(id)) {
      navigate(PATH_ERROR[404]);
      return;
    }

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
    setRoleClaims(roleInDb.claims.map((item) => item.claim));
  };

  if (!id) return <Navigate to={PATH_ROLE.LIST} />;

  const checkedInput = (claim: string) => {
    if (roleClaims.includes(claim)) {
      setRoleClaims((prom) => prom.filter((item) => item !== claim));
    } else {
      const result = JSON.parse(JSON.stringify(roleClaims));
      result.push(claim);
      setRoleClaims(result);
    }
  };

  return (
    <>
      <div>
        <div>
          {
           role && (
            <>
            <div>{role.name_en}</div>
            <div>{role.name_ua}</div>
            <div>{role.name_ru}</div>
            <br />
            <div>{role.description_en}</div>
            <div>{role.description_ua}</div>
            <div>{role.description_ru}</div>
            <br />
            <div>{formatDate(role.lastUpdate)}</div>
            <div>{formatDate(role.createDate)}</div>
              
              </>
           ) 
          }
        </div>
        <br />
        {claimList.map((item, i) => (
          <div key={i}>
            <input
              type="checkbox"
              id={item}
              checked={roleClaims.includes(item) ? true : false}
              onChange={() => checkedInput(item)}
            />
            <label htmlFor={item}>{item}</label>
          </div>
        ))}
      </div>
    </>
  );
}
