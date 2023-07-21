import React, { useState } from 'react';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { collectionService } from '../../services/collectionServices';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
}

// ----------------------------------------------------------------------

export default function ViewDecryptData({
  group,
  setGroup,
  decryptGroup,
  setDecryptGroup,
  setViewDecryptData,
}: IProps) {
  const [decryptPassword, setDecryptPassword] = useState('');
  const [addRecord, setAddRecord] = useState(false);
  const [newRecordName, setNewRecordName] = useState('');

  // change password
  const changePasswordToDecrypt = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecryptPassword(e.target.value);
  };

  // change new name to create record
  const changeNameToCreateNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordName(e.target.value);
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
      <div>
        <div>{group.name}</div>
        <input type="text" name="password" onChange={changePasswordToDecrypt} value={decryptPassword} />
        <div onClick={() => clickDecrypt(group.id)}>Decrypt</div>
      </div>
    );
  };

  // ----------------------------------------------------------------------

  const clickAddNewRecord = async (id: string) => {
    if (!group || group.data === '' || decryptPassword === '' || !decryptGroup) return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const upGroupFields: IDecryptGroutRecord[] = [
        ...decryptGroup.collectionData,
        { name: newRecordName, userFields: [] },
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
      <div>
        <div>add record</div>
        <input type="text" name="name" onChange={changeNameToCreateNewRecord} value={newRecordName} />
        <input type="text" name="password" onChange={changePasswordToDecrypt} value={decryptPassword} />
        <div onClick={() => clickAddNewRecord(group.id)}>Add</div>
      </div>
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
        <div className="viewGroupName">
          <span>{group.name}</span>
          <div className="buttonBlock">
            <div className="button" onClick={() => setAddRecord(!addRecord)}>
              +
            </div>
          </div>
        </div>
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
          {group && !decryptGroup && decryptForm()}
          {!addRecord && group && decryptGroup && decryptView()}
          {addRecord && group && decryptGroup && addRecordForm()}
        </div>
      </div>
    </>
  );
}
