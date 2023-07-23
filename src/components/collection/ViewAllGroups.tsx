import React, { useEffect, useState } from 'react';
import { SvgClose, SvgPlus } from '../../assets';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../types/decryptGroupType';
import { ButtonSvg } from '../buttons';
import Form from '../Form';
import Input, { EnumTypes } from '../Input';
import { Header2 } from '../headers';

import './ViewAllGroups.scss';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | null;
  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;

  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setViewDecryptData: (data: IDecryptGroutRecord | null) => void;
  setDecryptPassword: (data: string) => void;
  menuStatus: boolean;
  setMenuStatus: (data: boolean) => void;
}

// ----------------------------------------------------------------------

export default function ViewAllGroup({
  allGroups,
  setAllGroups,
  setGroup,
  setDecryptGroup,
  setViewDecryptData,
  setDecryptPassword,
  menuStatus,
  setMenuStatus,
}: IProps) {
  const [nameNewGroup, setNameNewGroup] = useState('');
  const [addGroup, setAddGroup] = useState(false);
  // Get user groups when loading component
  useEffect(() => {
    getAllGroups();
  }, []);
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);

  /* ----------------  Component logic  ---------------- */

  // Get all user groups
  const getAllGroups = async () => {
    const result = await collectionService.getAll();
    if (result.err) return;
    setAllGroups(result.res);
  };

  // Get group by id
  const getGroupById = async (id: string) => {
    const result = await collectionService.getById(id);
    if (result.err) return;
    setGroup(result.res);
  };

  const clickOnGroup = async (id: string) => {
    setGroup(null);
    setDecryptGroup(null);
    setViewDecryptData(null);
    setDecryptPassword('');
    getGroupById(id);
  };

  const createGroup = async () => {
    const result = await collectionService.create({ name: nameNewGroup });
    if (result.err) return;
    setAddGroup(false);
    getAllGroups();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameNewGroup(e.target.value);
  };

  useEffect(() => {
    function handleResize() {
      setWindowInnerWidth(window.innerWidth);
      if (window.innerWidth > 700) setMenuStatus(false);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const desktopUI = () => (
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
              {item.name}
            </div>
          ))}
      </div>
    </div>
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
