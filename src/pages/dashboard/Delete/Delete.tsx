import React from 'react';
import { SvgTrash } from '../../../assets';
import { ButtonDefault } from '../../../components';
import { collectionService } from '../../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout } from '../../../types/decryptGroupType';
import { decrypt, encrypt } from '../../../utils/crypto';
import './Delete.scss';

// ----------------------------------------------------------------------

interface IProps {
  onClose: () => void;
  deleteWarn: { name: string; id: string; type: 'record' | 'group' } | null;
  password: string | null;
  decryptGroup: IDecryptGrout | null;
  groupById: IGetByIdGroups_Res | null;
  allGroups: IGetAllGroups_Res[] | [];
  setAllGroups: (data: IGetAllGroups_Res[] | []) => void;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroupById: (data: IGetByIdGroups_Res | null) => void;
  protect: () => void;
}

// ----------------------------------------------------------------------

const Delete: React.FC<IProps> = ({
  onClose,
  deleteWarn,
  password,
  decryptGroup,
  groupById,
  setDecryptGroup,
  setGroupById,
  protect,
  allGroups,
  setAllGroups,
}) => {
  if (!deleteWarn) return <></>;

  // delete record
  const deleteRecord = async () => {
    if (!decryptGroup || !groupById || !password || !deleteWarn || deleteWarn.type !== 'record') return;
    try {
      decrypt(groupById.data, password);
      const updateDecryptGroup = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.filter((item) => item.id !== deleteWarn.id),
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), password);
      const result = await collectionService.editData(groupById.id, encryptUpGroup);
      if (result.err) throw result.err;
      setGroupById({ ...groupById, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      onClose();
    } catch (err) {
      onClose();
      console.error('Error password to decrypt');
    }
  };

  // Delete group
  const deleteGroup = async () => {
    if (!groupById || !deleteWarn || deleteWarn.type !== 'group') return;
    try {
      const result = await collectionService.delete(groupById.id);
      if (result.err) throw result.err;
      setAllGroups(allGroups.filter((item) => item.id !== groupById.id));
      onClose();
      protect();
    } catch (err) {
      onClose();
      console.error('Error password to decrypt');
    }
  };

  const submit = () => {
    if (deleteWarn.type === 'record') {
      deleteRecord();
      return;
    }
    deleteGroup();
  };

  return (
    <div className="Delete-Container-Close" onClick={() => onClose()}>
      <div className="Delete-Container" onClick={(e) => e.stopPropagation()}>
        <span className="title">
          <span className="titleSvg">
            <SvgTrash />
          </span>
          {deleteWarn.type === 'group' ? 'Delete group' : 'Delete record'}
        </span>
        <span className="warnText">{`Delete this 
          ${deleteWarn.type === 'group' ? `group` : 'record'}: '${deleteWarn.name}'? 
          This operation not turn back.`}</span>
        <div className="buttonBlock">
          <ButtonDefault title="Cancel" style="border" onClick={() => onClose()} />
          <ButtonDefault title="Delete" style="bg Red" onClick={() => submit()} />
        </div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Delete;
