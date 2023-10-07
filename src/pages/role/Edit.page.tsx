import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ERROR, PATH_ROLE } from '../../routes/paths';
import { uuid } from '../../utils/uuid';

export default function RoleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [roleNames, setRoleNames] = useState<string[]>(['', '', '']);
  const [roleDescriptions, setRoleDescriptions] = useState<string[]>(['', '', '']);

  const [claimList, setClaimList] = useState<string[]>([]);
  const [role, setRole] = useState<IRoleAndClaims | null>(null);
  const [roleClaims, setRoleClaims] = useState<string[]>([]);

  useEffect(() => {
    if (id && !uuid.check(id)) {
      navigate(PATH_ERROR[404]);
      return;
    } else {
      getClaimList();
      getRole();
    }
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
    setRoleNames([roleInDb.name_en, roleInDb.name_ua, roleInDb.name_ru]);
    setRoleDescriptions([roleInDb.description_en, roleInDb.description_ua, roleInDb.description_ru]);
  };

  const checkedInput = (claim: string) => {
    if (roleClaims.includes(claim)) {
      setRoleClaims((prev) => prev.filter((item) => item !== claim));
    } else {
      const result = JSON.parse(JSON.stringify(roleClaims));
      result.push(claim);
      setRoleClaims(result);
    }
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>, number: number) => {
    if (/name/.test(e.target.name)) {
      setRoleNames((prev) => prev.map((item, i) => (i === number ? e.target.value : item)));
    } else if (/description/.test(e.target.name)) {
      setRoleDescriptions((prev) => prev.map((item, i) => (i === number ? e.target.value : item)));
    }
  };

  const submit = async () => {
    if (role) {
      await roleService.edit({
        id: role.id,
        name_en: roleNames[0],
        name_ua: roleNames[1],
        name_ru: roleNames[2],
        description_en: roleDescriptions[0],
        description_ua: roleDescriptions[1],
        description_ru: roleDescriptions[2],
        claims: roleClaims,
      });
    } else {
      await roleService.create({
        name_en: roleNames[0],
        name_ua: roleNames[1],
        name_ru: roleNames[2],
        description_en: roleDescriptions[0],
        description_ua: roleDescriptions[1],
        description_ru: roleDescriptions[2],
        claims: roleClaims,
      });
    }
    
    navigate(PATH_ROLE.LIST);
  };

  const deleteRole = async () => {
    if (!id) return;
    await roleService.delete({ id });
    navigate(PATH_ROLE.LIST);
  };

  return (
    <>
      <div>
        <div>
          <>
            <input type="text" name="name_en" value={roleNames[0]} onChange={(e) => onChangeInput(e, 0)} />
            <input type="text" name="name_ua" value={roleNames[1]} onChange={(e) => onChangeInput(e, 1)} />
            <input type="text" name="name_ru" value={roleNames[2]} onChange={(e) => onChangeInput(e, 2)} />
            <br />
            <input
              type="text"
              name="description_en"
              value={roleDescriptions[0]}
              onChange={(e) => onChangeInput(e, 0)}
            />
            <input
              type="text"
              name="description_ua"
              value={roleDescriptions[1]}
              onChange={(e) => onChangeInput(e, 1)}
            />
            <input
              type="text"
              name="description_ru"
              value={roleDescriptions[2]}
              onChange={(e) => onChangeInput(e, 2)}
            />
          </>
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

      <button onClick={submit}>{id ? 'update' : 'create'}</button>
      {id && (
        <>
          <button onClick={() => navigate(`${PATH_ROLE.VIEW}/${id}`)}>Close</button>
          <button onClick={deleteRole}>Delete</button>
        </>
      )}
      <button onClick={() => navigate(PATH_ROLE.LIST)}>To list</button>
    </>
  );
}
