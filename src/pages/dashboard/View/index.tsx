import React, { useState } from 'react';
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
}

// ----------------------------------------------------------------------

const View: React.FC<IProps> = ({ setDecryptGroup, password, decryptGroup, groupById, setGroupById }) => {
  const [warn, setWarn] = useState<IDecryptGroutRecord | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  return (
    <div>
      <Table setWarn={setWarn} setEditId={setEditId} decryptGroup={decryptGroup} />
    </div>
  );
};

// ----------------------------------------------------------------------

export default View;
