import React, { useState } from 'react';
import { ButtonDefault, ContentHeder, LoaderDefault, Popup } from '../../componentsNew';
import CollectionTable from './collectionTable/CollectionTable';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import './Collection.scss';
import CollectionDecrypt from './CollectionDecrypt';
import EditRecord from './EditRecord';
import { collectionService } from '../../services/collectionServices';

// ----------------------------------------------------------------------

interface IProps {
  isLoading: boolean;
  group: IGetByIdGroups_Res | null;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  allGroups: IGetAllGroups_Res[];
  setAllGroups: (data: IGetAllGroups_Res[]) => void;
}

// ----------------------------------------------------------------------

const Collection: React.FC<IProps> = ({
  isLoading,
  group,
  decryptGroup,
  setDecryptGroup,
  setGroup,
  allGroups,
  setAllGroups,
}) => {
  const [popupEditId, setPopupEditId] = useState<string | null>(null);
  const [popupCreate, setPopupCreate] = useState(false);
  const [decryptPassword, setDecryptPassword] = useState<string | null>(null);
  const [popupWarn, setPopupWarn] = useState(false);

  const clickCreate = () => {
    setPopupCreate(true);
  };

  const deleteGroup = async () => {
    if (!group) return;
    const result = await collectionService.delete(group.id);
    if (result.err) return;
    const allGroupsState = [...allGroups];
    const updateAllGroups = allGroupsState.filter((item) => item.id !== group.id);
    setAllGroups(updateAllGroups);
    setGroup(null);
    setDecryptGroup(null);
    setDecryptPassword(null);
    setPopupWarn(false);
  };

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
        <>
          <ContentHeder title={group.name} onClick={clickCreate} onDelete={() => setPopupWarn(true)} />
          <CollectionTable
            decryptPassword={decryptPassword}
            group={group}
            setDecryptGroup={setDecryptGroup}
            setGroup={setGroup}
            decryptGroup={decryptGroup}
            onEdit={setPopupEditId}
          />
        </>
      )}

      {(popupEditId || popupCreate) && (
        <EditRecord
          isEdit={popupEditId}
          setPopupCreate={setPopupCreate}
          decryptPassword={decryptPassword}
          recordId={popupEditId}
          decryptGroup={decryptGroup}
          group={group}
          setDecryptGroup={setDecryptGroup}
          setGroup={setGroup}
          setPopupEditId={setPopupEditId}
        />
      )}

      {popupWarn && (
        <Popup
          title="Delete group"
          message={`Delete '${group?.name}' group? these actions are irreversible`}
          onClose={() => setPopupWarn(false)}
        >
          <ButtonDefault title="Close" style="border" onClick={() => setPopupWarn(false)} />
          <ButtonDefault title="Delete" style="bg Red" onClick={deleteGroup} />
        </Popup>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

export default Collection;
