import React, { useState } from 'react';
import { collectionService } from '../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IUserFields } from '../../../types/decryptGroupType';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import './Record.scss';
import { ButtonSvg } from '../../buttons';
import { SvgClose, SvgCopy, SvgEdit, SvgPlus, SvgSave, SvgTrash } from '../../../assets';
import { decrypt, encrypt } from '../../../utils/crypto';

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
  setGroupId,
  // UI
  windowInnerWidth,
  popupStatus,
  setPopupStatus,
}: IProps) {
  const [isEdit, setIsEdit] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [popupSaveEdit, setPopupSaveEdit] = useState(false);
  const [popupWorn, setPopupWorn] = useState(false);
  const [newRecordName, setNewRecordName] = useState('');
  const [addRecord, setAddRecord] = useState<IUserFields | null>(null);
  const [updateFields, setUpdateFields] = useState<IUserFields[] | null>(null);

  // ----------------------------------------------------------------------

  const changeEdit = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    if (!updateFields) return;
    setUpdateFields((prevUpdateFields) => {
      if (!prevUpdateFields) return updateFields;
      const updatedFields = [...prevUpdateFields];
      updatedFields[id] = { ...updatedFields[id], [e.target.name]: e.target.value };
      return updatedFields;
    });
  };

  const changeDelete = (id: number) => {
    if (!updateFields) return;
    setUpdateFields((prevUpdateFields) => {
      if (!prevUpdateFields) return updateFields;
      const updatedFields = [...prevUpdateFields];
      return updatedFields.filter((item, i) => i !== id);
    });
  };

  const changeNewRecordName = (e: React.ChangeEvent<HTMLInputElement>) => setNewRecordName(e.target.value);

  const changeAddRecord = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!addRecord) return;
    setAddRecord({ ...addRecord, [e.target.name]: e.target.value });
  };

  const setEdit = () => {
    if (!decryptGroup || groupId === null) return;
    setNewRecordName(decryptGroup.collectionData[groupId].name);
    setUpdateFields(decryptGroup.collectionData[groupId].userFields);
    setIsEdit(true);
  };

  const setAdd = () => {
    if (!decryptGroup || groupId === null) return;
    setAddRecord({ name: '', text: '' });
    setUpdateFields(decryptGroup.collectionData[groupId].userFields);
    setIsAdd(true);
  };

  const closeEdit = () => {
    setIsAdd(false);
    setIsEdit(false);
    setPopupWorn(false);
  };

  const saveEdit = async () => {
    if (!group || !decryptGroup || decryptPassword === '' || newRecordName === '' || groupId === null || !updateFields)
      return;
    try {
      decrypt(group.data, decryptPassword);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[groupId].userFields = updateFields;
      decryptGroupState.collectionData[groupId].name = newRecordName;
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setDecryptPassword('');
      setPopupSaveEdit(false);
      setIsEdit(false);
      setIsAdd(false);
      setUpdateFields(null);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  const changeAdd = async () => {
    if (!group || !decryptGroup || decryptPassword === '' || groupId === null || !updateFields || !addRecord) return;
    try {
      decrypt(group.data, decryptPassword);
      const decryptGroupState = decryptGroup;
      decryptGroupState.collectionData[groupId].userFields.push(addRecord);
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setDecryptPassword('');
      setPopupSaveEdit(false);
      setIsEdit(false);
      setIsAdd(false);
      setAddRecord(null);
      setUpdateFields(null);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  const deleteRecord = async () => {
    if (!group || !decryptGroup || decryptPassword === '' || groupId === null) return;
    try {
      decrypt(group.data, decryptPassword);
      const decryptGroupState = decryptGroup;
      const updateGroup = decryptGroupState.collectionData.filter((item, i) => i !== groupId);
      decryptGroupState.collectionData = updateGroup;
      const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(decryptGroupState);
      setDecryptPassword('');
      setPopupSaveEdit(false);
      setIsEdit(false);
      setIsAdd(false);
      setIsDelete(false);
      setAddRecord(null);
      setUpdateFields(null);
      setGroupId(null);
    } catch (err) {
      console.error('error decrypt');
    }
  };

  return (
    <>
      <div className="Record-desktopUI">
        <div className="inner-Record-desktopUI">
          {/* Header */}
          <div className="header">
            <div className="name">
              {isEdit ? (
                <input className="headerInputName" type="text" onChange={changeNewRecordName} value={newRecordName} />
              ) : decryptGroup && groupId !== null ? (
                decryptGroup.collectionData[groupId].name
              ) : (
                'Decrypt to view'
              )}
            </div>
            <div className="buttons">
              {decryptGroup && groupId !== null ? (
                <>
                  {!isAdd && (
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgTrash />} onClick={() => setIsDelete(true)} />
                    </span>
                  )}
                  {!isAdd && !isEdit && (
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgPlus />} onClick={setAdd} />
                    </span>
                  )}
                  {!isEdit && !isAdd && decryptGroup.collectionData[groupId].userFields.length > 0 && (
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgEdit />} onClick={setEdit} />
                    </span>
                  )}
                  {isEdit && (
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgSave />} bigSvg onClick={() => setPopupSaveEdit(true)} />
                    </span>
                  )}
                  {(isEdit || isAdd) && (
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgClose />} onClick={() => setPopupWorn(true)} />
                    </span>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Add record */}
          {isAdd && addRecord && (
            <Form submit={() => setPopupSaveEdit(true)}>
              <Input
                type={EnumTypes.text}
                name={'name'}
                onChange={changeAddRecord}
                value={addRecord.name}
                label={'Name'}
              />
              <Input
                type={EnumTypes.password}
                name={'text'}
                onChange={changeAddRecord}
                value={addRecord.text}
                label={'Data'}
              />
            </Form>
          )}

          {/* View content */}
          {decryptGroup && groupId !== null && !isEdit ? (
            decryptGroup.collectionData[groupId].userFields.map((item, i) => (
              <div key={i} className="viewContent">
                <div className="name">{item.name}</div>
                <div className="data">
                  {item.text}
                  <div className="buttons">
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgCopy />} onClick={() => navigator.clipboard.writeText(item.text)} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}

          {/* Edit content */}
          {decryptGroup && groupId !== null && isEdit && updateFields ? (
            updateFields.map((item, i) => (
              <div key={i} className="viewContent">
                <div className="name">
                  <input
                    className="viewContentNameInput"
                    type="text"
                    name="name"
                    onChange={(e) => changeEdit(e, i)}
                    value={updateFields[i].name}
                  />
                </div>
                <div className="data">
                  <input
                    className="viewContentDataInput"
                    type="text"
                    name="text"
                    onChange={(e) => changeEdit(e, i)}
                    value={updateFields[i].text}
                  />
                  <div className="buttons">
                    <span className="buttonBlock">
                      <ButtonSvg svg={<SvgTrash />} onClick={() => changeDelete(i)} />
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* Popup */}
      {popupSaveEdit && isAdd && (
        <>
          <div className="globalPopupClose" onClick={() => setPopupSaveEdit(false)}></div>
          <div className="globalPopupContainer">
            <Form submit={changeAdd} buttonName="Confirm edit">
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

      {popupSaveEdit && isEdit && (
        <>
          <div className="globalPopupClose" onClick={() => setPopupSaveEdit(false)}></div>
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

      {isDelete && (
        <>
          <div className="globalPopupClose" onClick={() => setIsDelete(false)}></div>
          <div className="globalPopupContainer">
            <Form submit={deleteRecord} buttonName="Confirm edit">
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

      {/* Popup worn */}
      {popupWorn && (
        <>
          <div className="globalPopupClose" onClick={() => setPopupWorn(false)}></div>
          <div className="globalPopupContainer">
            <Form submit={closeEdit} buttonName="Ok">
              <span>If you click Ok, all changes will disappear</span>
            </Form>
          </div>
        </>
      )}
    </>
  );
}
