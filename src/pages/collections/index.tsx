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
  // save all user groups
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  // save user group by id
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  // save decrypt group
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);

  // LOADINGS
  const [isLoadingAllGroups, setIsLoadingAllGroups] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Collection states
  const [isEditCollection, setIsEditCollection] = useState(false);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [isDeleteCollection, setIsDeleteCollection] = useState(false);

  //

  useEffect(() => {
    getAllGroups();
  }, []);

  // All
  const getAllGroups = async () => {
    setIsLoadingAllGroups(true);
    const result = await collectionService.getAll();
    setIsLoadingAllGroups(false);
    if (result.err) return;
    setAllGroups(result.res);
  };

  // get group by id
  const getGroupById = async (id: string) => {
    if (id === group?.id) return;
    setGroup(null);
    setDecryptGroup(null);

    setIsLoading(true);
    const result = await collectionService.getById(id);
    setIsLoading(false);
    if (result.err) return;
    setGroup(result.res);
  };

  //
  return (
    <>
      {isLoadingAllGroups && <LoaderDefault />}

      <div className="gridContainer">
        <Group
          getAllGroups={getAllGroups}
          allGroups={allGroups}
          selectGroup={group?.id}
          getGroupById={getGroupById}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
        />
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
