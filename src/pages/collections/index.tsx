import React, { useState, useEffect } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';

import './index.scss';
import { IDecryptGrout, IDecryptGroutRecord } from '../../types/decryptGroupType';
import ViewAllGroup from '../../components/collection/ViewAllGroups';
import ViewDecryptData from '../../components/collection/ViewDecryptData';
import ViewRecordData from '../../components/collection/ViewRecordData';
import { Header1 } from '../../components/headers';

// ----------------------------------------------------------------------

export default function Main() {
  // save all user groups
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);
  const [viewDecryptData, setViewDecryptData] = useState<IDecryptGroutRecord | null>(null);
  const [decryptPassword, setDecryptPassword] = useState('');

  const [menuStatus, setMenuStatus] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);

  const close = () => {
    setGroup(null);
    setDecryptGroup(null);
    setViewDecryptData(null);
    setDecryptPassword('');

    setPopupStatus(false);
    setMenuStatus(false);
  };

  return (
    <>
      <Header1 sidebarMenu={() => setMenuStatus(!menuStatus)} close={close} />

      <div className="gridContainer">
        <ViewAllGroup
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          setGroup={setGroup}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          setDecryptPassword={setDecryptPassword}
          menuStatus={menuStatus}
          setMenuStatus={setMenuStatus}
        />
        <ViewDecryptData
          group={group}
          setGroup={setGroup}
          decryptGroup={decryptGroup}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
          popupFunc={() => setPopupStatus(!popupStatus)}
        />
        <ViewRecordData
          viewDecryptData={viewDecryptData}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          decryptGroup={decryptGroup}
          group={group}
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
          popupStatus={popupStatus}
          setPopupStatus={setPopupStatus}
        />
      </div>
    </>
  );
}
