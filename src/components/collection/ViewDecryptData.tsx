import React, { useEffect, useState } from 'react';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { collectionService } from '../../services/collectionServices';
import { Header2 } from '../headers';
import Input, { EnumTypes, IInputValue } from '../Input';
import Form from '../Form';
import { ButtonSvg } from '../buttons';
import { SvgPlus } from '../../assets';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
  decryptPassword: string;
  setDecryptPassword: (data: string) => void;

  popupFunc: () => void;
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
  popupFunc,
}: IProps) {
  const [addRecord, setAddRecord] = useState(false);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
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

  // ----------------------------------------------------------------------

  const toViewData = (id: number) => {
    setViewDecryptData(null);
    if (!decryptGroup) return;
    setViewDecryptData(decryptGroup.collectionData[id]);
  };

  useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
      if (window.innerWidth > 700) popupFunc();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // ----------------------------------------------------------------------

  return (
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
              <div
                key={i}
                className="viewRecordNameContainer"
                onClick={() => {
                  toViewData(i);
                  if (windowInnerWidth <= 700) popupFunc();
                }}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}
        {addRecord && group && decryptGroup && (
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
        )}
      </div>
    </div>
  );
}
