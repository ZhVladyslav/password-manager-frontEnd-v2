import React, { useEffect, useState } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../types/decryptGroupType';
import Form from '../Form';
import Input, { EnumTypes } from '../Input';
import Header from './Header';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | null;
  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;

  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
  setDecryptPassword: (data: string) => void;
}

// ----------------------------------------------------------------------

export default function ViewAllGroup({
  allGroups,
  setAllGroups,
  setGroup,
  setDecryptGroup,
  setViewDecryptData,
  setDecryptPassword,
}: IProps) {
  const [nameNewGroup, setNameNewGroup] = useState('');
  const [addGroup, setAddGroup] = useState(false);
  // Get user groups when loading component
  useEffect(() => {
    getAllGroups();
  }, []);

  /* ----------------  Component logic  ---------------- */

  // Get all user groups
  const getAllGroups = async () => {
    const result = await collectionService.getAll();
    if (result.err) return;
    setAllGroups(result.res);
  };

  // Get group by id
  const getGroupById = async (id: string) => {
    const result = await collectionService.getById(id);
    if (result.err) return;
    setGroup(result.res);
  };

  const clickOnGroup = async (id: string) => {
    setGroup(null);
    setDecryptGroup(null);
    setViewDecryptData(null);
    setDecryptPassword('');
    getGroupById(id);
  };

  const createGroup = async () => {
    const result = await collectionService.create({ name: nameNewGroup });
    if (result.err) return;
    setAddGroup(false);
    getAllGroups();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameNewGroup(e.target.value);
  };

  const createGroupForm = () => {
    return (
      <Form submit={createGroup}>
        <Input type={EnumTypes.text} name={'GroupName'} onChange={handleChange} value={nameNewGroup} label={'Name'} />
      </Form>
    );
  };

  return (
    <>
      <div className="listGroups">
        <div className="inner-listGroups">
          <Header name={'Add group'} onClick={() => setAddGroup(!addGroup)} status={addGroup} />

          {addGroup && createGroupForm()}
          {allGroups &&
            !addGroup &&
            allGroups.map((item) => (
              <div key={item.id} onClick={() => clickOnGroup(item.id)} className="groupButton">
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
