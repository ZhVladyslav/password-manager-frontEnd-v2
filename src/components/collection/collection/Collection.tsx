import React, { useEffect, useState } from 'react';
import { SvgClose, SvgDotHorizontal, SvgPlus, SvgTrash } from '../../../assets';
import { collectionService } from '../../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../../types/collectionType';
import { ButtonSvg } from '../../buttons';
import { Header2 } from '../../headers';
import './Collection.scss';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import Form from '../../form/formContainers/Form';
import Input, { EnumTypes } from '../../form/inputs/Input';

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
  const [editName, setEditName] = useState({
    status: false,
    oldName: '',
    newName: '',
    id: '',
  });

  /* ----------------  Get user group/s  ---------------- */
  useEffect(() => {
    getAllGroups();
  }, []);

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

  /* ----------------  Component logic  ---------------- */

  // Select group
  const clickOnGroup = async (id: string) => {
    getGroupById(id);
  };

  // Create new group
  const createGroup = async () => {
    const result = await collectionService.create({ name: nameNewGroup });
    if (result.err) return;
    setAddGroup(false);
    getAllGroups();
  };

  // Change input new group name
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameNewGroup(e.target.value);
  };

  /* ----------------  Edit name group  ---------------- */
  const editNameSubmit = async () => {
    if (!allGroups || editName.id === '' || editName.newName === '') return;
    const result = await collectionService.editName(editName.id, editName.newName);
    if (result.err) return;
    setAllGroups(
      allGroups.map((item) => {
        if (item.id === editName.id) return { ...item, name: editName.newName };
        return item;
      }),
    );
    setEditName({ id: '', newName: '', oldName: '', status: false });
  };

  const deleteCollection = async (id: string) => {
    if (!allGroups) return;
    const result = await collectionService.delete(id);
    if (result.err) return;
    const allGroupsState = allGroups;
    const updateAllGroups = allGroupsState.filter((item) => item.id !== id);
    setAllGroups(updateAllGroups);
  };

  /* ----------------  UI  ---------------- */

  const desktopUI = () => (
    <>
      <div className="listGroups-desktop">
        <div className="inner-listGroups">
          <Header2
            name="Groups"
            buttons={[<ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddGroup(!addGroup)} />]}
          />

          {addGroup && (
            <Form submit={createGroup}>
              <Input
                type={EnumTypes.text}
                name={'GroupName'}
                onChange={handleChange}
                value={nameNewGroup}
                label={'Name'}
              />
            </Form>
          )}
          {allGroups &&
            !addGroup &&
            allGroups.map((item) => (
              <div key={item.id} onClick={() => clickOnGroup(item.id)} className="groupButton">
                <span className="name">{item.name}</span>
                <div className="buttonContainer">
                  <ButtonSvg
                    svg={<SvgTrash />}
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCollection(item.id);
                    }}
                  />
                  <ButtonSvg
                    svg={<SvgDotHorizontal />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditName({ ...editName, status: true, id: item.id, oldName: item.name });
                    }}
                  />
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
                label={`Edit name group: ${editName.oldName}`}
                name="newName"
                type={EnumTypes.text}
                value={editName.newName}
                onChange={(e) => setEditName({ ...editName, newName: e.target.value })}
              />
            </Form>
          </div>
        </>
      )}
    </>
  );

  const mobileUI = () => {
    if (!menuStatus) return <></>;
    return (
      <>
        <div className="listGroups-mobile-close" onClick={() => setMenuStatus(false)}></div>

        <div className="listGroups-mobile">
          <div className="inner-listGroups">
            <Header2
              name="Groups"
              buttons={[
                <ButtonSvg key={1} svg={<SvgPlus />} onClick={() => setAddGroup(!addGroup)} />,
                <ButtonSvg key={2} svg={<SvgClose />} onClick={() => setMenuStatus(false)} />,
              ]}
            />

            {addGroup && (
              <Form submit={createGroup}>
                <Input
                  type={EnumTypes.text}
                  name={'GroupName'}
                  onChange={handleChange}
                  value={nameNewGroup}
                  label={'Name'}
                />
              </Form>
            )}
            {allGroups &&
              !addGroup &&
              allGroups.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    clickOnGroup(item.id);
                    setMenuStatus(false);
                  }}
                  className="groupButton"
                >
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      </>
    );
  };

  return <>{windowInnerWidth <= 700 ? mobileUI() : desktopUI()}</>;
}
