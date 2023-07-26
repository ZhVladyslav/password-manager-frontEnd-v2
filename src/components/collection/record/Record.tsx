import React, { useState } from 'react';
import { collectionService } from '../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IUserFields } from '../../../types/decryptGroupType';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import './Record.scss';
import { ButtonSvg } from '../../buttons';
import {
  SvgClose,
  SvgConfirm,
  SvgCopy,
  SvgEdit,
  SvgHiddenPassword,
  SvgPlus,
  SvgSave,
  SvgTrash,
  SvgViewPassword,
} from '../../../assets';
import { decrypt, encrypt } from '../../../utils/crypto';
import SvgViewPasswordAsString from '../../../assets/viewPassword.svg';
import SvgHiddenPasswordAsString from '../../../assets/hiddenPassword.svg';

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
  const [isCreate, setIsCreate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [popupView, setPopupView] = useState(false);

  const [newRecordName, setNewRecordName] = useState('');
  const [createNewRecord, setCreateNewRecord] = useState<IUserFields | null>(null); // create new record field
  const [updateFields, setUpdateFields] = useState<IUserFields[] | null>(null);

  // form error
  const [formError, setFormError] = useState('');

  /* ----------------  Events  ---------------- */

  // drop all
  const dropAllStates = () => {
    setIsEdit(false);
    setIsCreate(false);
    setIsDelete(false);

    // popups
    setPopupView(false);

    // data
    setNewRecordName('');
    setCreateNewRecord(null);
    setUpdateFields(null);
    setDecryptPassword(''); // password
  };

  const clickEdit = () => {
    setIsEdit(true);
    setIsCreate(false);
  };

  const clickCreate = () => {
    setIsCreate(true);
    setIsEdit(false);
  };

  /* ----------------  UI Header Buttons and Name  ---------------- */

  // Name
  const headerName = () => {
    if (!group || !decryptGroup || groupId === null) return '';

    // edit name record
    if (isEdit) {
      const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewRecordName(e.target.value);
      };
      return <input className="headerInputName" type="text" onChange={changeEvent} value={newRecordName} />;
    }

    return decryptGroup.collectionData[groupId].name;
  };

  // Delete header button
  const headerButtonTrash = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (isCreate || !isEdit) return <></>;

    //
    const event = () => {
      setIsDelete(true);
      setPopupView(true);
    };

    //
    return (
      <span className="buttonBlock">
        <ButtonSvg svg={<SvgTrash />} onClick={event} />
      </span>
    );
  };

  // Create header button
  const headerButtonCreate = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (isCreate || isEdit) return <></>;

    //
    const event = () => {
      setCreateNewRecord({ name: '', text: '', hidden: false });
      setUpdateFields(decryptGroup.collectionData[groupId].userFields);
      clickCreate();
    };

    //
    return (
      <span className="buttonBlock">
        <ButtonSvg svg={<SvgPlus />} onClick={event} />
      </span>
    );
  };

  // Save header button
  const headerButtonSave = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (!isEdit) return <></>;

    //
    const event = () => setPopupView(true);

    //
    return (
      <span className="buttonBlock">
        <ButtonSvg svg={<SvgSave />} onClick={event} bigSvg />
      </span>
    );
  };

  // Edit header button
  const headerButtonEdit = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (
      isEdit ||
      isCreate ||
      !decryptGroup ||
      groupId === null ||
      decryptGroup.collectionData[groupId].userFields.length === 0
    )
      return <></>;

    //
    const event = () => {
      setNewRecordName(decryptGroup.collectionData[groupId].name);
      setUpdateFields(decryptGroup.collectionData[groupId].userFields);
      clickEdit();
    };

    //
    return (
      <span className="buttonBlock">
        <ButtonSvg svg={<SvgEdit />} onClick={event} />
      </span>
    );
  };

  // Close header button
  const headerButtonClose = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (!isEdit && !isCreate) return <></>;

    //
    const event = () => dropAllStates();

    //
    return (
      <span className="buttonBlock">
        <ButtonSvg svg={<SvgClose />} onClick={event} />
      </span>
    );
  };

  /* ----------------  UI Content  ---------------- */

  // Create content
  const uiCreateRecord = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (!isCreate || !createNewRecord) return <></>;

    const submit = () => setPopupView(true);

    // event on change inputs
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCreateNewRecord({ ...createNewRecord, [e.target.name]: e.target.value });
    };

    //  event on button click
    const eventOnButton = (status: boolean) => {
      setCreateNewRecord({ ...createNewRecord, hidden: status });
    };

    return (
      <div className="viewContent">
        <div className="name">
          <input
            className="viewContentNameInput"
            autoComplete="off"
            type="text"
            name="name"
            onChange={changeEvent}
            value={createNewRecord.name}
          />
        </div>
        <div className="data">
          <input
            className="viewContentDataInput"
            autoComplete="off"
            type="text"
            name="text"
            onChange={changeEvent}
            value={createNewRecord.text}
          />
          <div className="buttons">
            <span className="buttonBlock">
              {createNewRecord.hidden ? (
                <ButtonSvg svg={<SvgHiddenPassword />} onClick={() => eventOnButton(false)} />
              ) : (
                <ButtonSvg svg={<SvgViewPassword />} onClick={() => eventOnButton(true)} />
              )}
            </span>
            {/*  */}
            <span className="buttonBlock">
              <ButtonSvg svg={<SvgConfirm />} onClick={submit} />
            </span>
          </div>
        </div>
      </div>
    );
  };

  // View content
  const uiViewRecord = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (isEdit) return <></>;
    let svgView: HTMLElement | null;
    let svgHidden: HTMLElement | null;

    // get svg from url
    const getSvg = async (toGet: string): Promise<HTMLElement | null> => {
      try {
        const response = await fetch(toGet);
        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }

        const text = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(text, 'image/svg+xml');
        return svgDoc.documentElement;
      } catch (error) {
        console.error('Error fetching SVG:', error);
        return null;
      }
    };

    getSvg(SvgViewPasswordAsString).then((item) => (svgView = item));
    getSvg(SvgHiddenPasswordAsString).then((item) => (svgHidden = item));

    // hidden password
    const hiddenDataInInput = (text: string, id: number) => {
      const input = document.getElementById(`viewContent_data_${id}`);
      const inputButton = document.getElementById(`viewContent_button_${id}`);

      if (!input || !inputButton || !svgView || !svgHidden) return;
      const attribute = input.getAttribute(`data-hidden`);

      if (attribute === 'true') {
        input.setAttribute('data-hidden', 'false');
        input.textContent = text;

        inputButton.innerHTML = '';
        inputButton.appendChild(svgView);
      } else {
        input.setAttribute('data-hidden', 'true');
        input.textContent = '••••••••••••';

        inputButton.innerHTML = '';
        inputButton.appendChild(svgHidden);
      }
    };

    return decryptGroup.collectionData[groupId].userFields.map((item, i) => (
      <div key={i} className="viewContent">
        <div className="name">{item.name}</div>
        <div className="data">
          {item.hidden ? (
            <span id={`viewContent_data_${i}`} data-hidden="true">
              {'••••••••••••'}
            </span>
          ) : (
            <span>{item.text}</span>
          )}
          <div className="buttons">
            {item.hidden && (
              <span className="buttonBlock">
                <ButtonSvg
                  id={`viewContent_button_${i}`}
                  svg={<SvgHiddenPassword />}
                  onClick={() => hiddenDataInInput(item.text, i)}
                />
              </span>
            )}
            <span className="buttonBlock">
              <ButtonSvg svg={<SvgCopy />} onClick={() => navigator.clipboard.writeText(item.text)} />
            </span>
          </div>
        </div>
      </div>
    ));
  };

  // Edit content
  const uiEditRecord = () => {
    if (!group || !decryptGroup || groupId === null) return <></>;
    if (!isEdit || !updateFields) return <></>;

    // change inputs to edit value
    const event = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
      setUpdateFields((prevUpdateFields) => {
        if (!prevUpdateFields) return updateFields;
        const updatedFields = [...prevUpdateFields];
        updatedFields[id] = { ...updatedFields[id], [e.target.name]: e.target.value };
        return updatedFields;
      });
    };

    // event on button click
    const eventOnButton = (status: boolean, id: number) => {
      setUpdateFields((prevUpdateFields) => {
        if (!prevUpdateFields) return updateFields;
        const updatedFields = [...prevUpdateFields];
        updatedFields[id] = { ...updatedFields[id], hidden: status };
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

    return updateFields.map((item, i) => (
      <div key={i} className="viewContent">
        <div className="name">
          <input
            className="viewContentNameInput"
            autoComplete="off"
            type="text"
            name="name"
            onChange={(e) => event(e, i)}
            value={updateFields[i].name}
          />
        </div>
        <div className="data">
          <input
            className="viewContentDataInput"
            autoComplete="off"
            type="text"
            name="text"
            onChange={(e) => event(e, i)}
            value={updateFields[i].text}
          />
          <div className="buttons">
            <span className="buttonBlock">
              {updateFields[i].hidden ? (
                <ButtonSvg svg={<SvgHiddenPassword />} onClick={() => eventOnButton(false, i)} />
              ) : (
                <ButtonSvg svg={<SvgViewPassword />} onClick={() => eventOnButton(true, i)} />
              )}
            </span>
            {/*  */}
            <span className="buttonBlock">
              <ButtonSvg svg={<SvgTrash />} onClick={() => deleteEvent(i)} />
            </span>
          </div>
        </div>
      </div>
    ));
  };

  /* ----------------  Popup  ---------------- */
  const uiPopup = () => {
    if (!group || !decryptGroup || groupId === null || !popupView || (isCreate && isEdit)) return <></>;

    // edit
    const edit = async () => {
      if (decryptPassword === '' || newRecordName === '' || !updateFields) return;
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
        dropAllStates();
        setFormError('');
      } catch (err) {
        setFormError('Error password to decrypt');
      }
    };

    // create
    const create = async () => {
      if (decryptPassword === '' || !updateFields || !createNewRecord) return;
      try {
        decrypt(group.data, decryptPassword);
        const decryptGroupState = decryptGroup;
        decryptGroupState.collectionData[groupId].userFields.push(createNewRecord);
        const encryptUpGroup = encrypt(JSON.stringify(decryptGroupState), decryptPassword);
        const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
        if (result.err) return;
        setGroup({ ...group, data: encryptUpGroup });
        setDecryptGroup(decryptGroupState);
        dropAllStates();
        setFormError('');
      } catch (err) {
        setFormError('Error password to decrypt');
      }
    };

    // delete record
    const deleteRecord = async () => {
      if (decryptPassword === '') return;
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
      if (isEdit) {
        edit();
      } else if (isCreate) {
        create();
      } else if (isDelete) {
        deleteRecord();
      } else closePopup();
    };

    const buttonText = (): string => {
      if (isEdit && !isCreate && !isDelete) return 'Confirm edit change';
      if (isCreate && !isEdit && !isDelete) return 'Confirm edit change';
      if (isDelete) return 'Confirm delete';
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

  /* ----------------  UI MAIN ---------------- */

  const desktopUI = () => (
    <>
      <div className="Record-desktopUI">
        <div className="inner-Record-desktopUI">
          {/* Header */}
          <div className="header">
            <div className="name">{headerName()}</div>
            <div className="buttons">
              {headerButtonTrash()}
              {headerButtonCreate()}
              {headerButtonEdit()}
              {headerButtonSave()}
              {headerButtonClose()}
            </div>
          </div>

          {/* View content */}
          {uiViewRecord()}

          {/* Add record */}
          {uiCreateRecord()}

          {/* Edit content */}
          {uiEditRecord()}
        </div>
      </div>
      {uiPopup()}
    </>
  );

  const mobileUI = () => {
    if (!popupStatus) return <></>;
    return (
      <div className="Record-mobileUI" onClick={() => setPopupStatus(false)}>
        <div className="inner-Record-mobileUI" onClick={(e) => e.stopPropagation()}>
          {desktopUI()}
        </div>
      </div>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
