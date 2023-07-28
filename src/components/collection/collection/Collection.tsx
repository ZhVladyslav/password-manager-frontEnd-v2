import React, { useEffect, useState } from 'react';
import { SvgClose, SvgConfirm, SvgDotHorizontal, SvgEdit, SvgPlus, SvgSave, SvgTrash } from '../../../assets';
import { collectionService } from '../../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../../types/collectionType';
import { ButtonSvg } from '../../buttons';
import { Header2 } from '../../headers';
import './Collection.scss';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';
import { GroupBlock } from '../../blocks';
import HiddenInput from '../../form/inputs/HiddenInput/HiddenInput';

// ----------------------------------------------------------------------

interface IProps {
  // all
  allGroups: IGetAllGroups_Res[] | null;
  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  // decrypt
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  // by id
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  // id
  setGroupId: (data: number | null) => void;
  // UI
  windowInnerWidth: number;
  menuStatus: boolean;
  setMenuStatus: (data: boolean) => void;
}

interface IEditName {
  status: boolean;
  name: string;
  id: string;
}

// ----------------------------------------------------------------------

export default function Collection({
  allGroups,
  setAllGroups,
  windowInnerWidth,
  setGroup,
  setDecryptGroup,
  menuStatus,
  setMenuStatus,
  setGroupId,
}: IProps) {
  const [nameNewGroup, setNameNewGroup] = useState('');
  const [addGroup, setAddGroup] = useState(false);
  const [editName, setEditName] = useState<IEditName | null>(null);

  /* ----------------  Get user group/s  ---------------- */
  useEffect(() => {
    getAllGroups();
  }, []);

  /* ----------------  Requests  ---------------- */

  // All
  const getAllGroups = async () => {
    const result = await collectionService.getAll();
    if (result.err) return;
    setAllGroups(result.res);
  };

  // By id
  const getGroupById = async (id: string) => {
    setGroup(null);
    setDecryptGroup(null);
    setGroupId(null);
    const result = await collectionService.getById(id);
    if (result.err) return;
    setGroup(result.res);
  };

  // Delete collection
  const deleteCollection = async (id: string) => {
    if (!allGroups) return;
    const result = await collectionService.delete(id);
    if (result.err) return;
    const allGroupsState = allGroups;
    const updateAllGroups = allGroupsState.filter((item) => item.id !== id);
    setAllGroups(updateAllGroups);
  };

  // Edit name
  const editNameSubmit = async () => {
    if (!allGroups || !editName || editName.id === '') return;
    const result = await collectionService.editName(editName.id, editName.name);
    if (result.err) return;
    setAllGroups(
      allGroups.map((item) => {
        if (item.id === editName.id) return { ...item, name: editName.name };
        return item;
      }),
    );
    setEditName(null);
  };

  // Create collection
  const createCollection = async () => {
    const result = await collectionService.create({ name: nameNewGroup });
    if (result.err) return;
    setAddGroup(false);
    getAllGroups();
    setNameNewGroup('');
  };

  // ----------------------------------------------------------------------

  // View collections
  const uiViewCollections = () => {
    if (!allGroups) return <></>;

    // Change input new group name
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!editName) return;
      setEditName({ ...editName, name: e.target.value });
    };

    // Close edit name
    const closeEditName = () => {
      setEditName(null);
    };

    return allGroups.map((item) => {
      if (allGroups && (!editName || (editName && editName.id !== item.id))) {
        return (
          <GroupBlock
            key={item.id}
            title={item.name}
            onClick={() => getGroupById(item.id)}
            buttons={
              <>
                <ButtonSvg
                  svg={<SvgEdit />}
                  onClick={() => setEditName({ name: item.name, status: true, id: item.id })}
                />
              </>
            }
          />
        );
      } else if (allGroups && editName && editName.status && editName.id === item.id) {
        return (
          <GroupBlock
            key={item.id}
            title={<HiddenInput name="name" type="text" onChange={(e) => changeEvent(e)} value={editName.name} />}
            buttons={
              <>
                <ButtonSvg svg={<SvgTrash />} onClick={() => deleteCollection(editName.id)} />
                <ButtonSvg svg={<SvgConfirm />} onClick={editNameSubmit} />
                <ButtonSvg svg={<SvgClose />} onClick={closeEditName} />
              </>
            }
          />
        );
      }

      return <></>;
    });
  };

  // Create collection
  const uiCreateCollection = () => {
    if (!addGroup) return <></>;

    // Change input new group name
    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => setNameNewGroup(e.target.value);

    return (
      <GroupBlock
        title={<HiddenInput name="name" type="text" onChange={(e) => changeEvent(e)} value={nameNewGroup} />}
        buttons={
          <>
            <ButtonSvg svg={<SvgConfirm />} onClick={createCollection} />
            <ButtonSvg svg={<SvgClose />} onClick={() => setAddGroup(false)} />
          </>
        }
      />
    );
  };

  /* ----------------  UI  ---------------- */

  const desktopUI = () => (
    <>
      <div className="listGroups-desktop">
        <div className="inner-listGroups">
          {uiViewCollections()}
          {uiCreateCollection()}
          {!addGroup && (
            <div className="addButton" onClick={() => setAddGroup(true)}>
              {`Add group `}
              <div className="svg">
                <div className="inner-svg">
                  <SvgSave />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  const mobileUI = () => {
    if (!menuStatus) return <></>;
    return (
      <>
        <div className="listGroups-mobile-close" onClick={() => setMenuStatus(false)}></div>
        <div className="listGroups-mobile">
          <div className="inner-listGroups">{desktopUI()}</div>
        </div>
      </>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
