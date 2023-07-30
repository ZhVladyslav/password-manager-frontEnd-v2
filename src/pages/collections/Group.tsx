import React, { useState, useEffect } from 'react';
import { SvgPlus } from '../../assets';
import {
  ButtonDefault,
  InputText,
  useInputText,
  FormDefault,
  useFormDefault,
  SidebarDefault,
} from '../../componentsNew';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';

// ----------------------------------------------------------------------

interface IProps {
  allGroups: IGetAllGroups_Res[] | [];
  selectGroup: string | undefined;
  getGroupById: (data: string) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  getAllGroups: () => Promise<void>;
}

// ----------------------------------------------------------------------

export default function Group({
  getAllGroups,
  allGroups,
  selectGroup,
  getGroupById,
  setDecryptGroup,
  setGroup,
}: IProps) {
  const [isCreateGroup, setIsCreateGroup] = useState(false);

  const inputNameNewGroup = useInputText({ reg: /^[A-Za-z0-9]+$/, errorText: 'Error' });
  const formAddNewGroup = useFormDefault({ inputs: [inputNameNewGroup.valid] });

  const clickToCreateNewGroup = () => {
    setIsCreateGroup(true);
    setDecryptGroup(null);
    setGroup(null);
  };

  useEffect(() => {
    inputNameNewGroup.dropState();
  }, [isCreateGroup]);

  // Create collection
  const createCollection = async () => {
    const result = await collectionService.create({ name: inputNameNewGroup.value });
    if (result.err) return;
    setIsCreateGroup(false);
    getAllGroups();
  };

  return (
    <>
      <SidebarDefault
        allGroups={allGroups}
        onAddGroup={clickToCreateNewGroup}
        selectGroup={getGroupById}
        selectedGroup={selectGroup}
      />

      {isCreateGroup && (
        <FormDefault
          title="Create group"
          alone
          onSubmit={createCollection}
          formValid={formAddNewGroup.valid}
          onClose={() => setIsCreateGroup(false)}
        >
          <InputText
            title="Name"
            error={inputNameNewGroup.error}
            onChange={inputNameNewGroup.onChange}
            value={inputNameNewGroup.value}
            onBlur={inputNameNewGroup.onBlur}
          />
        </FormDefault>
      )}
    </>
  );
}
