import React, { useState, useEffect } from 'react';
import { InputText, useInputText, FormDefault, useFormDefault, SidebarDefault } from '../../componentsNew';
import { collectionService } from '../../services/collectionServices';
import { IGetAllGroups_Res, IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setIsLoading: (data: boolean) => void;
  setIsLoadingAllGroups: (data: boolean) => void;
}

// ----------------------------------------------------------------------

export default function Group({ setDecryptGroup, setIsLoading, setIsLoadingAllGroups, setGroup, group }: IProps) {
  const [allGroups, setAllGroups] = useState<IGetAllGroups_Res[]>([]);
  const [isCreateGroup, setIsCreateGroup] = useState(false);
  const inputNameNewGroup = useInputText({ reg: /^[A-Za-z0-9]+$/, errorText: 'Error' });
  const formAddNewGroup = useFormDefault({ inputs: [inputNameNewGroup.valid] });

  useEffect(() => {
    inputNameNewGroup.dropState();
  }, [isCreateGroup]);

  const clickToCreateNewGroup = () => {
    setIsCreateGroup(true);
    setDecryptGroup(null);
    setGroup(null);
  };

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
        selectedGroup={group?.id}
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
