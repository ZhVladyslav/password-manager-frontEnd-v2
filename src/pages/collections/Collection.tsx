import React, { useState } from 'react';
import { LoaderDefault } from '../../componentsNew';
import CollectionTable from './collectionTable/CollectionTable';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import './Collection.scss';
import CollectionDecrypt from './CollectionDecrypt';
import EditRecord from './EditRecord';

// ----------------------------------------------------------------------

interface IProps {
  isLoading: boolean;
  group: IGetByIdGroups_Res | null;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
}

// ----------------------------------------------------------------------

const Collection: React.FC<IProps> = ({ isLoading, group, decryptGroup, setDecryptGroup, setGroup }) => {
  const [popupEditId, setPopupEditId] = useState<string | null>(null);
  const [decryptPassword, setDecryptPassword] = useState<string | null>(null);

  return (
    <div className="Collection">
      {isLoading && <LoaderDefault />}

      {group && !decryptGroup && (
        <CollectionDecrypt
          group={group}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
          setDecryptPassword={setDecryptPassword}
        />
      )}

      {group && decryptGroup && (
        <CollectionTable
          decryptPassword={decryptPassword}
          group={group}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
          decryptGroup={decryptGroup}
          onEdit={setPopupEditId}
        />
      )}

      {popupEditId && (
        <EditRecord
          decryptPassword={decryptPassword}
          recordId={popupEditId}
          decryptGroup={decryptGroup}
          group={group}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
          setPopupEditId={setPopupEditId}
        />
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

export default Collection;
