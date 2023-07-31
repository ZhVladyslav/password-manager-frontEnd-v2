import React, { useState, useEffect } from 'react';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import './index.scss';
import { IDecryptGrout } from '../../types/decryptGroupType';
import Group from './Group';
import { collectionService } from '../../services/collectionServices';
import { LoaderDefault } from '../../componentsNew';
import Collection from './Collection';

// ----------------------------------------------------------------------

export default function Main() {
  // save user group by id
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  // save decrypt group
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);

  // LOADINGS
  const [isLoadingAllGroups, setIsLoadingAllGroups] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //
  return (
    <>
      {isLoadingAllGroups && <LoaderDefault />}

      <div className="gridContainer">
        <Group
          group={group}
          setGroup={setGroup}
          setIsLoadingAllGroups={setIsLoadingAllGroups}
          setDecryptGroup={setDecryptGroup}
          setIsLoading={setIsLoading}
        />

        {/*  */}
        {/*  */}
        {/*  */}

        <Collection
          isLoading={isLoading}
          group={group}
          decryptGroup={decryptGroup}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
        />
      </div>
    </>
  );
}
