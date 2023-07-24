import React, { useState } from 'react';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { collectionService } from '../../../services/collectionServices';
import { Header2 } from '../../headers';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import { ButtonSvg } from '../../buttons';
import { SvgDotHorizontal, SvgPlus } from '../../../assets';
import { IInputValue } from '../../form/inputs/Input';

// ----------------------------------------------------------------------

interface IProps {
  // encrypt
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  // decrypt
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  // pass
  decryptPassword: string;
  setDecryptPassword: (data: string) => void;
  // id
  groupId: number | null;
  setGroupId: (data: number | null) => void;
  // UI
  setPopupStatus: (data: boolean) => void;
  windowInnerWidth: number;
}

// ----------------------------------------------------------------------

const defaultInputData: IInputValue = {
  value: '',
  blur: false,
  error: false,
  focus: false,
  valid: false,
};
// ----------------------------------------------------------------------

export default function Group({
  // encrypt
  group,
  setGroup,
  // decrypt
  decryptGroup,
  setDecryptGroup,
  // pass
  decryptPassword,
  setDecryptPassword,
  // id
  // groupId,
  setGroupId,
  // UI
  setPopupStatus,
  windowInnerWidth,
}: IProps) {
  const [addRecord, setAddRecord] = useState(false);
  const [newRecordName, setNewRecordName] = useState<IInputValue>(defaultInputData);
  const [editName, setEditName] = useState({ status: false, oldName: '', newName: '', id: '', position: -1 });

  /* ----------------  Crypto  ---------------- */

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

  /* ----------------  Generate new group content  ---------------- */
  const createNewGroupDate = async (id: string) => {
    if (!group || group.data !== '' || decryptPassword === '') return;
    const groupDefaultData: IDecryptGrout = {
      id: id,
      version: 'V2',
      date: { create: Date.now(), lastEdit: Date.now() },
      collectionData: [
        {
          name: 'Main email',
          userFields: [
            { name: 'Email', text: 'Hello@gmail.com' },
            { name: 'Password', text: '1111' },
          ],
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

  /* ----------------  Add record in group  ---------------- */
  const addRecordInGroup = async (id: string) => {
    if (!group || !decryptGroup || decryptPassword === '') return;
    try {
      // decrypt group to check password
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      // copy decrypt group and push new record
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData.push({ name: newRecordName.value, userFields: [] });
      // encrypt group and request to server
      const encryptUpGroup: string = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setDecryptPassword('');
      setAddRecord(false);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  // ----------------------------------------------------------------------

  const toViewData = (id: number) => {
    setGroupId(null);
    if (!decryptGroup) return;
    if (windowInnerWidth <= 700) {
      setPopupStatus(true);
    }
    setGroupId(id);
  };

  /* ----------------  Functions to input data  ---------------- */

  // click to decrypt group
  const clickDecrypt = (id: string) => {
    setDecryptGroup(null);
    createNewGroupDate(id);
    decrypt();
  };

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

  /* ----------------  Edit name record  ---------------- */
  const editNameSubmit = async () => {
    if (!group || !decryptGroup || decryptPassword === '') return;
    if (editName.id === '' || editName.newName === '' || editName.position === -1) return;

    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[editName.position].name = editName.newName;
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(editName.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setEditName({ id: '', newName: '', oldName: '', status: false, position: -1 });
      setDecryptPassword('');
    } catch (err) {
      console.error('error decrypt');
    }
  };

  /* ----------------  UI  ---------------- */

  return (
    <>
      <div className="viewGroup">
        <div className="inner-viewGroup">
          <Header2
            name={group ? group.name : 'Decrypt to view'}
            buttons={[decryptGroup && <ButtonSvg key={1} svg={<SvgPlus />} onClick={toggleAddRecord} />]}
          />

          {group && !decryptGroup && (
            <Form submit={() => clickDecrypt(group.id)} buttonName={group.data === '' ? 'Generate group' : 'Decrypt'}>
              <Input
                type={EnumTypes.password}
                name={'GroupPassword'}
                onChange={changePasswordToDecrypt}
                value={decryptPassword}
                label={'Password'}
              />
            </Form>
          )}
          {!addRecord && group && decryptGroup && (
            <div>
              {decryptGroup.collectionData.map((item, i) => (
                <div key={i} className="viewRecordNameContainer" onClick={() => toViewData(i)}>
                  <span className="name">{item.name}</span>
                  <div className="buttonContainer">
                    <ButtonSvg
                      svg={<SvgDotHorizontal />}
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditName({
                          ...editName,
                          status: true,
                          id: decryptGroup.id,
                          oldName: item.name,
                          position: i,
                        });
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          {addRecord && group && decryptGroup && (
            <Form submit={() => addRecordInGroup(group.id)}>
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
          )}
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}

      {editName.status && (
        <>
          <div className="globalPopupClose" onClick={() => setEditName({ ...editName, status: false })}></div>
          <div className="globalPopupContainer">
            <Form submit={editNameSubmit} buttonName="Edit name">
              <Input
                label={`Edit name record: ${editName.oldName}`}
                name="newName"
                type={EnumTypes.text}
                value={editName.newName}
                onChange={(e) => setEditName({ ...editName, newName: e.target.value })}
              />
              <Input
                label="Password to group"
                name="groupKey"
                type={EnumTypes.password}
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
              />
            </Form>
          </div>
        </>
      )}
    </>
  );
}
