import React, { useState } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { Header2 } from '../headers';
import Form from '../form/formContainers/Form';
import Input, { EnumTypes } from '../form/inputs/Input';
import './ViewRecordInGroup.scss';
import { ButtonSvg } from '../buttons';
import { SvgClose, SvgPlus } from '../../assets';
import { IGroupId } from '../../pages/collections';

// ----------------------------------------------------------------------

interface IProps {
  // encrypt
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  // decrypt
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  // password
  decryptPassword: string;
  setDecryptPassword: (data: string) => void;
  // id
  groupId: IGroupId | null;
  setGroupId: (data: IGroupId | null) => void;
  // UI
  windowInnerWidth: number;
  popupStatus: boolean;
  setPopupStatus: (data: boolean) => void;
}

// ----------------------------------------------------------------------

export default function ViewRecordData({
  // encrypt
  group,
  setGroup,
  // decrypt
  decryptGroup,
  setDecryptGroup,
  // password
  decryptPassword,
  setDecryptPassword,
  // id
  groupId,
  // setGroupId,
  // UI
  windowInnerWidth,
  popupStatus,
  setPopupStatus,
}: IProps) {
  const [newRecord, setNewRecord] = useState({ name: '', data: '' });
  const [editName, setEditName] = useState({
    status: false,
    position: -1,
    name: { old: '', new: '' },
    data: { old: '', new: '' },
  });
  // UI
  const [addRecord, setAddRecord] = useState(false);

  /* ----------------  Crypt  ---------------- */

  // Encrypt data
  const encrypt = (text: string, key: string) => {
    return CryptoJS.AES.encrypt(text, key).toString();
  };

  /* ----------------  New field  ---------------- */
  const newRecordField = async () => {
    if (!group || !decryptGroup || !groupId || decryptPassword === '') return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[groupId.collectionId].userFields.push({
        name: newRecord.name,
        text: newRecord.data,
        visible: false,
      });
      const encryptUpGroup: string = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(group.id, encryptUpGroup);
      if (result.err) return;
      setDecryptPassword('');
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setAddRecord(false);
      setNewRecord({ data: '', name: '' });
    } catch (err) {
      console.error('error decrypt');
    }
  };

  /* ----------------  Input data  ---------------- */

  // change
  const changeNewRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewRecord({ ...newRecord, [e.target.name]: e.target.value });
  };

  // change password
  const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDecryptPassword(e.target.value);
  };

  /* ----------------  Edit name record  ---------------- */
  const editNameSubmit = async () => {
    if (!group || !decryptGroup || decryptPassword === '' || !groupId) return;
    if (editName.position === -1) return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[groupId.collectionId].userFields[editName.position].name = editName.name.new;
      decryptGroupState.collectionData[groupId.collectionId].userFields[editName.position].text = editName.data.new;
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setEditName({ status: false, position: -1, name: { old: '', new: '' }, data: { old: '', new: '' } });
      setDecryptPassword('');
    } catch (err) {
      console.error('error decrypt');
    }
  };

  /* ----------------  UI  ---------------- */

  const JsxAddRecord = () => (
    <Form submit={newRecordField}>
      <Input type={EnumTypes.text} name={'name'} onChange={changeNewRecord} value={newRecord.name} label={'Name'} />
      <Input type={EnumTypes.password} name={'data'} onChange={changeNewRecord} value={newRecord.data} label={'Data'} />
      <Input
        type={EnumTypes.password}
        name={'GroupPassword'}
        onChange={changePassword}
        value={decryptPassword}
        label={'Password to group'}
      />
    </Form>
  );

  const desktopUI = () => (
    <>
      <div className="viewRecordInGroup-desktop">
        <div className="inner-viewRecordInGroup">
          <Header2
            name={decryptGroup && groupId ? decryptGroup.collectionData[groupId.collectionId].name : 'Decrypt to view'}
            buttons={[
              groupId && decryptGroup && (
                <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />
              ),
            ]}
          />

          {addRecord && groupId && decryptGroup && JsxAddRecord()}

          {decryptGroup &&
            groupId &&
            !addRecord &&
            decryptGroup.collectionData[groupId.collectionId].userFields.map((item, i) => (
              <div key={i}>
                <div
                  className="recordName"
                  onClick={() =>
                    setEditName({
                      ...editName,
                      name: { old: item.name, new: item.name },
                      data: { old: item.text, new: item.text },
                      position: i,
                      status: true,
                    })
                  }
                >
                  <span>{item.name}</span>
                </div>
                <div className="recordData" onClick={() => navigator.clipboard.writeText(item.text)}>
                  {item.text}
                </div>
              </div>
            ))}
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
                label={`Edit name record: ${editName.name.old}`}
                name="newName"
                type={EnumTypes.text}
                value={editName.name.new}
                onChange={(e) => setEditName({ ...editName, name: { new: e.target.value, old: editName.name.old } })}
              />
              <Input
                label={`Edit name record: ${editName.name.old}`}
                name="newData"
                type={EnumTypes.text}
                value={editName.data.new}
                onChange={(e) => setEditName({ ...editName, data: { new: e.target.value, old: editName.data.old } })}
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

  const mobileUI = () => {
    if (!popupStatus) return <></>;

    return (
      <>
        <div className="viewRecordInGroupContainer-mobile" onClick={() => setPopupStatus(false)}>
          <div
            className="viewRecordInGroup-mobile"
            onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          >
            <div className="inner-viewRecordInGroup">
              <Header2
                name={
                  decryptGroup && groupId ? decryptGroup.collectionData[groupId.collectionId].name : 'Decrypt to view'
                }
                buttons={[
                  groupId && <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />,
                  <ButtonSvg key={2} svg={<SvgClose />} onClick={() => setPopupStatus(false)} />,
                ]}
              />

              {addRecord && groupId && JsxAddRecord()}

              {decryptGroup &&
                groupId &&
                !addRecord &&
                decryptGroup.collectionData[groupId.collectionId].userFields.map((item, i) => (
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
        </div>
      </>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
