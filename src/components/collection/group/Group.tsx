import React, { useState } from 'react';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../types/decryptGroupType';
import { collectionService } from '../../../services/collectionServices';
import { Header2 } from '../../headers';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import { ButtonSvg } from '../../buttons';
import { SvgClose, SvgConfirm, SvgEdit, SvgPlus, SvgSave, SvgTrash } from '../../../assets';
import { IInputValue } from '../../form/inputs/Input';
import { decrypt, encrypt } from '../../../utils/crypto';
import { GroupBlock } from '../../blocks';
import HiddenInput from '../../form/inputs/HiddenInput/HiddenInput';
import DecryptGroupForm from '../../form/DecryptGroupForm/DecryptGroupForm';

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
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [popupView, setPopupView] = useState(false);
  //
  const [newGroupName, setNewGroupName] = useState('');
  const [createRecord, setCreateRecord] = useState('');
  const [updateFields, setUpdateFields] = useState<IDecryptGroutRecord[] | null>(null);
  const [formError, setFormError] = useState('');

  /* ----------------  Events  ---------------- */

  // drop all
  const dropAllStates = () => {
    setIsEdit(false);
    setIsCreate(false);
    setIsDelete(false);
    setPopupView(false);
    setNewGroupName('');
    setUpdateFields(null);
    setCreateRecord('');
    setDecryptPassword(''); // password
  };

  // generate group if empty data
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
            { name: 'Email', text: 'Hello@gmail.com', hidden: false },
            { name: 'Password', text: '1111', hidden: true },
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

  // Decrypt group
  const decryptDb = () => {
    if (!group || group.data === '' || decryptPassword === '') return;
    try {
      const decryptDataInText = decrypt(group.data, decryptPassword, true);
      const decryptData: IDecryptGrout = JSON.parse(decryptDataInText);
      setDecryptGroup(decryptData);
      setDecryptPassword('');
      setFormError('');
    } catch (err) {
      setFormError('Error password to decrypt');
    }
  };

  // clock to decrypt group
  const clickDecrypt = (id: string) => {
    setDecryptGroup(null);
    createNewGroupDate(id);
    decryptDb();
  };

  /* ----------------  UI Header Buttons and Name  ---------------- */

  // Name
  const headerName = () => {
    if (!group || !decryptGroup) return '';

    // edit name group
    if (isEdit) {
      const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGroupName(e.target.value);
      };
      return <input className="headerInputName" type="text" onChange={changeEvent} value={newGroupName} />;
    }

    return group.name;
  };

  // Save header button
  const headerButtonSave = () => {
    if (!group || !decryptGroup) return <></>;
    if (!isEdit) return <></>;

    //
    const event = () => setPopupView(true);

    //
    return <ButtonSvg svg={<SvgConfirm />} onClick={event} />;
  };

  // Edit header button
  const headerButtonEdit = () => {
    if (!group || !decryptGroup) return <></>;
    if (isEdit || isCreate || !decryptGroup) return <></>;

    //
    const event = () => {
      setNewGroupName(group.name);
      setUpdateFields(decryptGroup.collectionData);
      setIsEdit(true);
    };

    //
    return <ButtonSvg svg={<SvgEdit />} onClick={event} />;
  };

  // Close header button
  const headerButtonClose = () => {
    if (!group || !decryptGroup) return <></>;
    if (!isEdit && !isCreate) return <></>;

    //
    const event = () => dropAllStates();

    //
    return <ButtonSvg svg={<SvgClose />} onClick={event} />;
  };

  /* ----------------  UI View content  ---------------- */

  // Create content
  const uiCreateRecord = () => {
    if (!group || !decryptGroup) return <></>;
    if (!isCreate || !updateFields) return <></>;

    // event on change inputs
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateRecord(e.target.value);
    };

    const complete = () => {
      setUpdateFields([
        ...updateFields,
        {
          name: createRecord,
          userFields: [
            { name: 'Email', text: '...@gmail.com', hidden: false },
            { name: 'Password', text: '1111', hidden: true },
          ],
        },
      ]);
      setIsCreate(false);
    };

    const onKeyDownEvent = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) complete();
      else if (e.keyCode === 27) setIsCreate(false);
    };

    return (
      <GroupBlock
        title={
          <HiddenInput
            onKeyDown={(e) => onKeyDownEvent(e)}
            name="name"
            type="text"
            onChange={changeEvent}
            value={createRecord}
          />
        }
        buttons={
          <>
            <ButtonSvg svg={<SvgConfirm />} onClick={complete} />
            <ButtonSvg svg={<SvgClose />} onClick={() => setIsCreate(false)} />
          </>
        }
      />
    );
  };

  // View content
  const uiViewGroup = () => {
    if (!group || !decryptGroup) return <></>;
    if (isEdit) return <></>;

    const clickEvent = (id: number) => {
      if (windowInnerWidth <= 700) setPopupStatus(true);
      setGroupId(id);
    };

    return decryptGroup.collectionData.map((item, i) => (
      <GroupBlock key={i} title={item.name} onClick={() => clickEvent(i)} />
    ));
  };

  // Edit content
  const uiEditRecord = () => {
    if (!group || !decryptGroup) return <></>;
    if (!isEdit || !updateFields) return <></>;

    // change inputs to edit value
    const event = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      setUpdateFields((prevUpdateFields) => {
        if (!prevUpdateFields) return updateFields;
        const updatedFields = [...prevUpdateFields];
        updatedFields[id] = { ...updatedFields[id], name: e.target.value };
        return updatedFields;
      });
    };

    // delete record
    const deleteEvent = (id: number) => {
      setUpdateFields((prevUpdateFields) => {
        if (!prevUpdateFields) return updateFields;
        const updatedFields = [...prevUpdateFields];
        return updatedFields.filter((item, i) => i !== id);
      });
    };

    return (
      <>
        {updateFields.map((item, i) => (
          <GroupBlock
            key={i}
            title={<HiddenInput name="name" type="text" onChange={(e) => event(e, i)} value={updateFields[i].name} />}
            buttons={
              <>
                <ButtonSvg svg={<SvgTrash />} onClick={() => deleteEvent(i)} />
              </>
            }
          />
        ))}
        {/*  */}
        {!isCreate && (
          <div
            className="addButton"
            onClick={() => {
              setIsCreate(true);
            }}
          >
            {`Add group `}
            <div className="svg">
              <div className="inner-svg">
                <SvgSave />
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  /* ----------------  Popup  ---------------- */
  const uiPopup = () => {
    if (!group || !decryptGroup || !popupView || (isCreate && isEdit)) return <></>;

    // save edits
    const save = async () => {
      if (decryptPassword === '' || !updateFields) return;
      try {
        decrypt(group.data, decryptPassword);
        const decryptGroupState = decryptGroup;
        decryptGroupState.collectionData = updateFields;
        const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
        const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
        if (result.err) return;
        setGroup({ ...group, data: encryptUpGroup });
        setDecryptGroup(decryptGroupState);
        setGroupId(null);
        dropAllStates();
        setFormError('');
      } catch (err) {
        setFormError('Error password to decrypt');
      }
    };

    // close popup
    const closePopup = () => {
      if (isDelete) {
        setIsDelete(false);
      }
      setPopupView(false);
    };

    //
    const submit = () => {
      if (isEdit && !isCreate && !isDelete) save();
      else if (isCreate && !isEdit && !isDelete) save();
      else if (isDelete) save();
      else closePopup();
    };

    const buttonText = (): string => {
      if (isEdit && !isCreate && !isDelete) return 'Confirm edit change';
      else if (isCreate && !isEdit && !isDelete) return 'Confirm edit change';
      else if (isDelete) return 'Confirm delete';
      return '';
    };

    //
    return (
      <>
        <div className="globalPopupClose" onClick={closePopup} />

        <div className="globalPopupContainer">
          <Form submit={submit} buttonName={buttonText()} errorValue={formError}>
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
    );
  };

  /* ----------------  UI  ---------------- */

  const desktopUI = () => (
    <>
      <div className="Record-desktopUI">
        <div className="inner-Record-desktopUI">
          {/* Header */}
          {decryptGroup && (
            <Header2
              title={headerName()}
              buttons={
                <>
                  {headerButtonEdit()}
                  {headerButtonSave()}
                  {headerButtonClose()}
                </>
              }
            />
          )}

          {/* decrypt group */}
          {group && !decryptGroup && (
            <DecryptGroupForm
              title={`Decrypt group: ${group.name}`}
              label="Password"
              name="GroupKey"
              buttonText="Decrypt group"
              errorForm={formError}
              value={decryptPassword}
              onChange={(e) => setDecryptPassword(e.target.value)}
              onSubmit={() => clickDecrypt(group.id)}
            />
          )}

          {/* View content */}
          {uiViewGroup()}

          {/* Edit content */}
          {uiEditRecord()}

          {/* Add record */}
          {uiCreateRecord()}
        </div>
      </div>
      {uiPopup()}
    </>
  );

  const mobileUI = () => {
    // if (!popupView) return <></>;
    return (
      // <div className="Record-mobileUI" onClick={() => setPopupView(false)}>
      //   <div className="inner-Record-mobileUI" onClick={(e) => e.stopPropagation()}>
      <>{desktopUI()}</>
      //   </div>
      // </div>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
