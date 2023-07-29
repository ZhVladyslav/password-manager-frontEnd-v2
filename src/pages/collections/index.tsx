import React, { useState, useEffect } from 'react';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import './index.scss';
import { IDecryptGrout } from '../../types/decryptGroupType';
import Collection from '../../components/collection/collection/Collection';
import Record from '../../components/collection/record/Record';
import { Header1 } from '../../components/headers';
import Group from './Group';
import { collectionService } from '../../services/collectionServices';

// ----------------------------------------------------------------------

export default function Main() {
  // save all user groups
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  // save user group by id
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  // save decrypt group
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);
  // id to view, edit and delete
  const [groupId, setGroupId] = useState<number | null>(null);
  // password to decrypt group
  const [decryptPassword, setDecryptPassword] = useState('');

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
    const result = await collectionService.getAll();
    if (result.err) return;
    setAllGroups(result.res);
  };

  // get group by id
  const getGroupById = async (id: string) => {
    setIsLoading(true);
    const result = await collectionService.getById(id);
    setIsLoading(false);
    if (result.err) return;
    setGroup(result.res);
  };

  //
  return (
    <>
      {isLoading && (
        <div className="loadingContainer">
          <div className="loaderContainer">
            <span className="loader">
              <span className="firstLine" />
              <span className="secondLine" />
            </span>
          </div>
        </div>
      )}

      <div className="gridContainer">
        <Group allGroups={allGroups} selectGroup={group?.id} getGroupById={getGroupById} />
        <div className="test"></div>
      </div>
    </>
  );
}
