import React, { useState, useEffect } from 'react';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import './index.scss';
import { IDecryptGrout } from '../../types/decryptGroupType';
import Collection from '../../components/collection/collection/Collection';
import Group from '../../components/collection/group/Group';
import Record from '../../components/collection/record/Record';
import { Header1 } from '../../components/headers';

// ----------------------------------------------------------------------

export default function Main() {
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]); // save all user groups
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null); // save user group by id
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null); // save decrypt group
  const [groupId, setGroupId] = useState<number | null>(null); // id to view, edit and delete
  const [decryptPassword, setDecryptPassword] = useState(''); // password to decrypt group
  // UI states
  const [windowInnerWidth, setWindowInnerWidth] = useState(window.innerWidth);
  const [menuStatus, setMenuStatus] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);

  /* ----------------  Effect to look edit window width  ---------------- */
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

  //
  const close = () => {
    setGroup(null);
    setDecryptGroup(null);
    setGroupId(null);
    setDecryptPassword('');
    // UI
    setPopupStatus(false);
    setMenuStatus(false);
  };

  return (
    <>
      <Header1 sidebarMenu={() => setMenuStatus(!menuStatus)} close={close} />

      <div className="gridContainer">
        <Collection
          // all
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          // decrypt
          setDecryptGroup={setDecryptGroup}
          // by
          setGroup={setGroup}
          // id
          setGroupId={setGroupId}
          // UI
          windowInnerWidth={windowInnerWidth}
          menuStatus={menuStatus}
          setMenuStatus={setMenuStatus}
        />

        <Group
          // encrypt
          group={group}
          setGroup={setGroup}
          // decrypt
          decryptGroup={decryptGroup}
          setDecryptGroup={setDecryptGroup}
          // pass
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
          // id
          groupId={groupId}
          setGroupId={setGroupId}
          // UI
          windowInnerWidth={windowInnerWidth}
          setPopupStatus={setPopupStatus}
        />
        <Record
          // encrypt
          group={group}
          setGroup={setGroup}
          // decrypt
          decryptGroup={decryptGroup}
          setDecryptGroup={setDecryptGroup}
          // password
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
          // id
          groupId={groupId}
          setGroupId={setGroupId}
          // UI
          windowInnerWidth={windowInnerWidth}
          popupStatus={popupStatus}
          setPopupStatus={setPopupStatus}
        />
      </div>
    </>
  );
}
