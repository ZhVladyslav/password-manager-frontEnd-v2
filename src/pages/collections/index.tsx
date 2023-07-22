import React, { useState, useEffect } from 'react';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';

import './index.scss';
import { IDecryptGrout, IDecryptGroutRecord, IUserFields } from '../../types/decryptGroupType';
import ViewAllGroup from '../../components/collection/ViewAllGroups';
import ViewDecryptData from '../../components/collection/ViewDecryptData';
import ViewRecordData from '../../components/collection/ViewRecordData';

// ----------------------------------------------------------------------

export default function Main() {
  // save all user groups
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);
  const [viewDecryptData, setViewDecryptData] = useState<IDecryptGroutRecord | null>(null);
  const [decryptPassword, setDecryptPassword] = useState('');

  return (
    <>
      <div className="gridContainer">
        <ViewAllGroup
          allGroups={allGroups}
          setAllGroups={setAllGroups}
          setGroup={setGroup}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          setDecryptPassword={setDecryptPassword}
        />
        <ViewDecryptData
          group={group}
          setGroup={setGroup}
          decryptGroup={decryptGroup}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
        />
        <ViewRecordData
          viewDecryptData={viewDecryptData}
          setDecryptGroup={setDecryptGroup}
          setViewDecryptData={setViewDecryptData}
          decryptGroup={decryptGroup}
          group={group}
          decryptPassword={decryptPassword}
          setDecryptPassword={setDecryptPassword}
        />
      </div>
    </>
  );
}
