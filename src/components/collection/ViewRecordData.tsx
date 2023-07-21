import React, { useState } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';

// ----------------------------------------------------------------------

interface IProps {
  viewDecryptData: IDecryptGroutRecord | null;
  decryptGroup: IDecryptGrout | null;
  group: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
}

// ----------------------------------------------------------------------

export default function ViewRecordData({
  viewDecryptData,
  decryptGroup,
  group,
  setViewDecryptData,
  setDecryptGroup,
}: IProps) {
  const [decryptPassword, setDecryptPassword] = useState('');
  const [addRecord, setAddRecord] = useState(false);

  const [newRecordName, setNewRecordName] = useState('');
  const [newRecordData, setNewRecordData] = useState('');

  // change
  const changeNameNewNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordName(e.target.value);
  };

  // change
  const changeNameToCreateNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecordData(e.target.value);
  };

  // change password
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecryptPassword(e.target.value);
  };

  // ----------------------------------------------------------------------

  // Encrypt data
  const encrypt = (text: string, key: string) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  //
  const clickAddRecord = async () => {
    if (!group || !decryptGroup || !viewDecryptData || decryptPassword === '') return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const upUserFields: IUserFields[] = [
        ...viewDecryptData.userFields,
        { name: newRecordName, text: newRecordData, visible: false },
      ];
      const upDate: IDecryptGrout = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.map((item) => {
          if (item.name === viewDecryptData.name) return { name: item.name, userFields: upUserFields };
          return item;
        }),
      };
      const encryptUpGroup: string = encrypt(JSON.stringify(upDate), decryptPassword);
      const result = await collectionService.editData(group.id, encryptUpGroup);
      if (result.err) return;
      setDecryptPassword('');
      setViewDecryptData({ name: viewDecryptData.name, userFields: upUserFields });
      setDecryptGroup(upDate);
      setAddRecord(false);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  return (
    <>
      <div className="viewRecordInGroup">
        <div className="inner-viewRecordInGroup">
          {viewDecryptData && !addRecord && <div onClick={() => setAddRecord(!addRecord)}>Add</div>}

          {addRecord && (
            <div>
              <div>add record</div>
              <input type="text" name="name" onChange={changeNameNewNewRecord} value={newRecordName} />
              <input type="text" name="password" onChange={changeNameToCreateNewRecord} value={newRecordData} />
              <input type="text" name="password" onChange={changePassword} value={decryptPassword} />
              <div onClick={clickAddRecord}>Add</div>
            </div>
          )}

          {viewDecryptData &&
            !addRecord &&
            viewDecryptData.userFields.map((item, i) => (
              <div key={i}>
                <div className="recordName">
                  <span>{item.name}</span>
                </div>
                <div className="recordData" onClick={() => navigator.clipboard.writeText(item.text)}>
                  {item.text}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
