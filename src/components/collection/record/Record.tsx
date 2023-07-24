import React, { ChangeEvent, useState } from 'react';
import { collectionService } from '../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IUserFields } from '../../../types/decryptGroupType';
import CryptoJS from 'crypto-js';
import { Header2 } from '../../headers';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import './Record.scss';
import { ButtonSvg } from '../../buttons';
import { SvgClose, SvgEdit, SvgPlus, SvgSave } from '../../../assets';

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
  groupId: number | null;
  setGroupId: (data: number | null) => void;
  // UI
  windowInnerWidth: number;
  popupStatus: boolean;
  setPopupStatus: (data: boolean) => void;
}

// ----------------------------------------------------------------------

export default function Record({
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
  const [editFieldsStatus, setEditFieldsStatus] = useState(false);
  const [popupEditFieldsStatus, setPopupEditFieldsStatus] = useState(false);
  const [updateFields, setUpdateFields] = useState<IUserFields[] | null>(null);

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
      decryptGroupState.collectionData[groupId].userFields.push({
        name: newRecord.name,
        text: newRecord.data,
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

  const clickEdit = () => {
    if (groupId === null || !decryptGroup) return;
    setEditFieldsStatus(true);
    setUpdateFields(decryptGroup.collectionData[groupId].userFields);
  };

  const changeEdit = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (!updateFields) return;
    //
    setUpdateFields((prevUpdateFields) => {
      if (!prevUpdateFields) return updateFields;
      const updatedFields = [...prevUpdateFields];
      updatedFields[id] = { ...updatedFields[id], [e.target.name]: e.target.value };
      return updatedFields;
    });
  };

  const saveEdit = async () => {
    if (!group || !decryptGroup || decryptPassword === '' || groupId === null || !updateFields) return;
    try {
      CryptoJS.AES.decrypt(group.data, decryptPassword).toString(CryptoJS.enc.Utf8);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[groupId].userFields = updateFields;
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setDecryptPassword('');
      setEditFieldsStatus(false);
      setPopupEditFieldsStatus(false);
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
            name={decryptGroup && groupId !== null ? decryptGroup.collectionData[groupId].name : 'Decrypt to view'}
            buttons={[
              !editFieldsStatus && groupId !== null && <ButtonSvg key={2} svg={<SvgEdit />} onClick={clickEdit} />,
              editFieldsStatus && groupId !== null && (
                <ButtonSvg key={3} svg={<SvgSave />} onClick={() => setPopupEditFieldsStatus(true)} bigSvg />
              ),
              editFieldsStatus && <ButtonSvg key={4} svg={<SvgClose />} onClick={() => setEditFieldsStatus(false)} />,
              groupId !== null && decryptGroup && !editFieldsStatus ? (
                <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />
              ) : null,
            ]}
          />

          {addRecord && groupId && decryptGroup && JsxAddRecord()}

          {decryptGroup && groupId !== null && !addRecord && !editFieldsStatus
            ? decryptGroup.collectionData[groupId].userFields.map((item, i) => (
                <div key={`${i}view`}>
                  <div className="recordName">
                    <span>{item.name}</span>
                  </div>
                  <div className="recordData" onClick={() => navigator.clipboard.writeText(item.text)}>
                    {item.text}
                  </div>
                </div>
              ))
            : null}

          {decryptGroup && groupId !== null && !addRecord && editFieldsStatus && updateFields
            ? updateFields.map((item, i) => (
                <div key={`${i}edit`}>
                  <div className="recordName">
                    <input type="text" value={updateFields[i].name} name="name" onChange={(e) => changeEdit(e, i)} />
                  </div>
                  <div className="recordData">
                    <input type="text" value={updateFields[i].text} name="text" onChange={(e) => changeEdit(e, i)} />
                  </div>
                </div>
              ))
            : null}
        </div>
      </div>

      {/*  */}
      {/*  */}
      {/*  */}

      {popupEditFieldsStatus && (
        <>
          <div className="globalPopupClose" onClick={() => setPopupEditFieldsStatus(false)}></div>
          <div className="globalPopupContainer">
            <Form submit={saveEdit} buttonName="Confirm edit">
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
                name={decryptGroup && groupId ? decryptGroup.collectionData[groupId].name : 'Decrypt to view'}
                buttons={[
                  groupId && <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddRecord(!addRecord)} />,
                  <ButtonSvg key={2} svg={<SvgClose />} onClick={() => setPopupStatus(false)} />,
                ]}
              />

              {addRecord && groupId && JsxAddRecord()}

              {decryptGroup &&
                groupId &&
                !addRecord &&
                decryptGroup.collectionData[groupId].userFields.map((item, i) => (
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
