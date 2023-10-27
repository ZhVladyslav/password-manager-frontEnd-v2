import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IRoleAndClaims } from '../../types/role.type';
import { roleService } from '../../services/role.service';
import { PATH_ERROR, PATH_ROLE } from '../../routes/paths';
import { uuid } from '../../utils/uuid';
import style from './edit.page.module.scss';
import { Button, InputText } from '../../components';
import { useInputText } from '../../hooks/useInputText.hook';

export default function RoleEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameEn = useInputText();
  const nameUa = useInputText();
  const nameRu = useInputText();
  const descriptionEn = useInputText();
  const descriptionUa = useInputText();
  const descriptionRu = useInputText();

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

    nameEn.setValue(roleInDb.name_en);
    nameUa.setValue(roleInDb.name_ua);
    nameRu.setValue(roleInDb.name_ru);

    descriptionEn.setValue(roleInDb.description_en);
    descriptionUa.setValue(roleInDb.description_ru);
    descriptionRu.setValue(roleInDb.description_ru);
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

  const submit = async () => {
    if (role) {
      await roleService.edit({
        id: role.id,
        name_en: nameEn.value,
        name_ua: nameUa.value,
        name_ru: nameRu.value,
        description_en: descriptionEn.value,
        description_ua: descriptionUa.value,
        description_ru: descriptionRu.value,
        claims: roleClaims,
      });
    } else {
      await roleService.create({
        name_en: nameEn.value,
        name_ua: nameUa.value,
        name_ru: nameRu.value,
        description_en: descriptionEn.value,
        description_ua: descriptionUa.value,
        description_ru: descriptionRu.value,
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
      <div className={style.buttonContainer}>
        {id && <Button title="Delete" onClick={deleteRole} />}
        <Button title={id ? 'update' : 'create'} onClick={submit} />
        <Button title="To list" onClick={() => navigate(PATH_ROLE.LIST)} />
        {id && <Button title="Close" onClick={() => navigate(`${PATH_ROLE.VIEW}/${id}`)} />}
      </div>

      <div className={style.main}>
        <InputText title="Name english" inputHook={nameEn} name="nameEn" />
        <InputText title="Name ukraine" inputHook={nameUa} name="nameUa" />
        <InputText title="Name ru" inputHook={nameRu} name="nameRu" />
        {/*  */}
        <InputText title="Description english" inputHook={descriptionEn} name="descriptionEn" />
        <InputText title="Description ukraine" inputHook={descriptionUa} name="descriptionUa" />
        <InputText title="Description ru" inputHook={descriptionRu} name="descriptionRu" />
      </div>

      <div className={style.claimContainer}>
        {claimList.map((item, i) => (
          <div key={i} className={style[roleClaims.includes(item) ? 'access' : 'close']}>
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
