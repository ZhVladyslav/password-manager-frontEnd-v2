import React, { useState, useEffect } from 'react';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import './index.scss';
import { IDecryptGrout } from '../../types/decryptGroupType';
import Group from './Group';
import { collectionService } from '../../services/collectionServices';
import { LoaderDefault } from '../../componentsNew';
import Collection from './Collection';
import { authService } from '../../services/authServices';
import { sessionActions } from '../../redux/slices/sessionSlice';

// ----------------------------------------------------------------------

export default function Main() {
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  // save user group by id
  const [group, setGroup] = useState<IGetByIdGroups_Res | null>(null);
  // save decrypt group
  const [decryptGroup, setDecryptGroup] = useState<IDecryptGrout | null>(null);

  // LOADINGS
  const [isLoadingAllGroups, setIsLoadingAllGroups] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [protect, setProtect] = useState(false);

  useEffect(() => {
    if (protect) {
      setGroup(null);
      setDecryptGroup(null);
      setProtect(false);
    }
  }, [protect]);

  //
  //
  //

  useEffect(() => {
    const checkCombination = (event: KeyboardEvent) => {
      // console.log(event.key);
      // console.log(event.shiftKey);
      // console.log(event.ctrlKey);
      // console.log(event.altKey);

      if (/^[qQйЙ]$/.test(event.key) && event.ctrlKey) {
        setProtect(true);
      }
      if (/^[lLдД]$/.test(event.key) && event.ctrlKey) {
        authService.logout();
        sessionActions.logout();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      checkCombination(event);
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  //
  //
  //

  //
  return (
    <>
      {isLoadingAllGroups && <LoaderDefault />}

      <div className="gridContainer">
        <Group
          allGroups={allGroups}
          setProtect={setProtect}
          setAllGroups={setAllGroups}
          group={group}
          setGroup={setGroup}
          setIsLoadingAllGroups={setIsLoadingAllGroups}
          setDecryptGroup={setDecryptGroup}
          setIsLoading={setIsLoading}
        />

        {/*  */}
        {/*  */}
        {/*  */}

        {!protect ? (
          <Collection
            allGroups={allGroups}
            setAllGroups={setAllGroups}
            isLoading={isLoading}
            group={group}
            decryptGroup={decryptGroup}
            setDecryptGroup={setDecryptGroup}
            setGroup={setGroup}
          />
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}
