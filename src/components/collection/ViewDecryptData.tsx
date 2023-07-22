import React, { useState } from 'react';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { collectionService } from '../../services/collectionServices';
import Header from './Header';
import Input, { EnumTypes, IInputValue } from '../Input';
import Form from '../Form';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
  decryptPassword: string;
  setDecryptPassword: (data: string) => void;
}

// ----------------------------------------------------------------------

export default function ViewDecryptData({
  group,
  setGroup,
  decryptGroup,
  setDecryptGroup,
  setViewDecryptData,
  decryptPassword,
  setDecryptPassword,
}: IProps) {
  const [addRecord, setAddRecord] = useState(false);
  const [newRecordName, setNewRecordName] = useState<IInputValue>({
    value: '',
    blur: false,
    error: false,
    focus: false,
    valid: false,
  });

  // change password
  const changePasswordToDecrypt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecryptPassword(e.target.value);
  };

  // change new name to create record
  const changeNameToCreateNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordName({ ...newRecordName, value: e.target.value });
  };

  const toggleAddRecord = () => {
    if (!decryptGroup) return;
    setAddRecord(!addRecord);
  };

  // ----------------------------------------------------------------------

  // Encrypt data
  const encrypt = (text: string, key: string) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  // Decrypt data
  const decrypt = () => {
    if (!group || group.data === '' || decryptPassword === '') return;
    try {
      const decryptDataInText = CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const decryptData: IDecryptGrout = JSON.parse(decryptDataInText);
      setDecryptGroup(decryptData);
      setDecryptPassword('');
    } catch (err) {
      console.error('error decrypt');
    }
  };

  // ----------------------------------------------------------------------

  // create new group data
  const createNewGroupDate = async (id: string) => {
    if (!group || group.data !== '' || decryptPassword === '') return;
    const groupDefaultData: IDecryptGrout = {
      id: id,
      version: 'V2',
      date: { create: Date.now(), lastEdit: Date.now() },
      collectionData: [
        {
          name: 'Main email',
          userFields: [{ name: 'Gmail', text: 'Hello@gmail.com', visible: false }],
        },
      ],
    };
    const encryptNewGroup: string = encrypt(JSON.stringify(groupDefaultData), decryptPassword);
    const result = await collectionService.editData(id, encryptNewGroup);
    if (result.err) return;
    setGroup({ ...group, data: encryptNewGroup });
    setDecryptGroup(groupDefaultData);
    setDecryptPassword('');
  };

  // click to decrypt group
  const clickDecrypt = (id: string) => {
    setDecryptGroup(null);
    createNewGroupDate(id);
    decrypt();
  };

  // JSX form decrypt group
  const decryptForm = () => {
    if (!group) return <></>;
    return (
      <Form submit={() => clickDecrypt(group.id)} buttonName={group.data === '' ? 'Generate group' : 'Decrypt'}>
        <Input
          type={EnumTypes.password}
          name={'GroupPassword'}
          onChange={changePasswordToDecrypt}
          value={decryptPassword}
          label={'Password'}
        />
      </Form>
    );
  };

  // ----------------------------------------------------------------------

  const clickAddNewRecord = async (id: string) => {
    if (!group || group.data === '' || decryptPassword === '' || !decryptGroup) return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const upGroupFields: IDecryptGroutRecord[] = [
        ...decryptGroup.collectionData,
        { name: newRecordName.value, userFields: [] },
      ];
      const upDecryptGroup: IDecryptGrout = { ...decryptGroup, collectionData: upGroupFields };
      const encryptUpGroup: string = encrypt(JSON.stringify(upDecryptGroup), decryptPassword);
      const result = await collectionService.editData(id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(upDecryptGroup);
      setDecryptPassword('');
      setAddRecord(false);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  // JSX add record
  const addRecordForm = () => {
    if (!group) return <></>;
    return (
      <Form submit={() => clickAddNewRecord(group.id)}>
        <Input
          type={EnumTypes.text}
          name={'GroupName'}
          onChange={changeNameToCreateNewRecord}
          value={newRecordName}
          label={'Name'}
        />
        <Input
          type={EnumTypes.password}
          name={'GroupPassword'}
          onChange={changePasswordToDecrypt}
          value={decryptPassword}
          label={'Password to group'}
        />
      </Form>
    );
  };

  // ----------------------------------------------------------------------

  const toViewData = (id: number) => {
    setViewDecryptData(null);
    if (!decryptGroup) return;
    setViewDecryptData(decryptGroup.collectionData[id]);
  };

  // JSX view decrypt data
  const decryptView = () => {
    if (!decryptGroup || !group) return <></>;
    return (
      <div>
        {decryptGroup.collectionData.map((item, i) => (
          <div key={i} className="viewRecordNameContainer" onClick={() => toViewData(i)}>
            {item.name}
          </div>
        ))}
      </div>
    );
  };

  // ----------------------------------------------------------------------

  return (
    <>
      <div className="viewGroup">
        <div className="inner-viewGroup">
          {group && <Header name={group.name} onClick={toggleAddRecord} status={addRecord} />}
          {group && !decryptGroup && decryptForm()}
          {!addRecord && group && decryptGroup && decryptView()}
          {addRecord && group && decryptGroup && addRecordForm()}
        </div>
      </div>
    </>
  );
}
