import React from 'react';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../types/decryptGroupType';
import Table from './Table/Table';

// ----------------------------------------------------------------------

interface IProps {
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  password: string | null;
  decryptGroup: IDecryptGrout | null;
  groupById: IGetByIdGroups_Res | null;
  setGroupById: (data: IGetByIdGroups_Res | null) => void;
  setDeleteWarn: (data: { name: string; id: string; type: 'record' | 'group' } | null) => void;
  setAddRecord: (data: IDecryptGroutRecord | null) => void;
}

// ----------------------------------------------------------------------

const View: React.FC<IProps> = ({
  setDeleteWarn,
  setDecryptGroup,
  password,
  decryptGroup,
  groupById,
  setGroupById,
  setAddRecord,
}) => {
  return (
    <div>
      <Table setDeleteWarn={setDeleteWarn} decryptGroup={decryptGroup} setAddRecord={setAddRecord} />
    </div>
  );
};

// ----------------------------------------------------------------------

export default View;
