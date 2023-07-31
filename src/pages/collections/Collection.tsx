import React, { useState, useEffect } from 'react';
import { FormDefault, InputText, LoaderDefault, useFormDefault, useInputText } from '../../componentsNew';
import TableDefault from '../../componentsNew/tables/TableDefault/TableDefault';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import { decrypt, encrypt, uuid, uuidHash } from '../../utils/crypto';
import './Collection.scss';

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
  const [popupEdit, setPopupEdit] = useState(false);
  const [editId, setEditId] = useState<string>('');
  //
  const inputDecryptPassword = useInputText({ reg: /^[A-Za-z0-9]{1,128}$/, errorText: 'Error' });
  const formDecryptCollection = useFormDefault({ inputs: [inputDecryptPassword.valid] });
  //
  const inputEditName = useInputText({ reg: /^[A-Za-z0-9 ]{1,128}$/, errorText: 'Error' });
  const inputEditUrl = useInputText({ reg: /^[A-Za-z0-9 .]{1,128}$/, errorText: 'Error' });
  const inputEditEmail = useInputText({ reg: /^[A-Za-z0-9 .@]{1,128}$/, errorText: 'Error' });
  const inputEditPassword = useInputText({ reg: /^[A-Za-z0-9 ]{1,128}$/, errorText: 'Error' });
  const inputEditDescription = useInputText({ reg: /^[A-Za-z0-9 ]{1,128}$/, errorText: 'Error' });
  const formEditRecord = useFormDefault({
    inputs: [
      inputEditName.valid,
      inputEditUrl.valid,
      inputEditEmail.valid,
      inputEditPassword.valid,
      inputEditDescription.valid,
    ],
  });

  // generate group if empty data
  const createNewGroupDate = async () => {
    if (!group || group.data !== '' || inputDecryptPassword.value === '') return;
    const groupDefaultData: IDecryptGrout = {
      id: group.id,
      version: 'V2',
      payload: uuidHash(),
      date: { create: Date.now(), lastEdit: Date.now() },
      collectionData: [
        {
          id: uuid(),
          name: 'demo',
          url: 'demo.com',
          email: '...@gmail.com',
          password: '1111',
          description: 'This demo field',
        },
      ],
    };
    const encryptNewGroup: string = encrypt(JSON.stringify(groupDefaultData), inputDecryptPassword.value);
    const result = await collectionService.editData(group.id, encryptNewGroup);
    if (result.err) return;
    setGroup({ ...group, data: encryptNewGroup });
    setDecryptGroup(groupDefaultData);
  };

  // decrypt collection
  const decryptCollection = () => {
    if (!group || group.data === '' || inputDecryptPassword.value === '') return;
    try {
      const decryptDataInText = decrypt(group.data, inputDecryptPassword.value, true);
      const decryptData: IDecryptGrout = JSON.parse(decryptDataInText);
      setDecryptGroup(decryptData);
      formDecryptCollection.setErrorText(null);
    } catch (err) {
      formDecryptCollection.setErrorText('Error password to decrypt');
    }
  };

  const submit = () => {
    createNewGroupDate();
    decryptCollection();
  };

  const close = () => {
    setGroup(null);
    setDecryptGroup(null);
    inputDecryptPassword.dropState();
  };

  // delete record
  const deleteRecord = async (id: string) => {
    if (inputDecryptPassword.value === '' || !decryptGroup || !group) return;
    try {
      decrypt(group.data, inputDecryptPassword.value);
      const updateDecryptGroup = {
        ...decryptGroup,
        collectionData: decryptGroup.collectionData.filter((item) => item.id !== id),
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), inputDecryptPassword.value);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  // edit record
  const editRecord = async () => {
    if (inputDecryptPassword.value === '' || !decryptGroup || !group) return;
    try {
      decrypt(group.data, inputDecryptPassword.value);
      const editRecordIndex = decryptGroup.collectionData.findIndex((item) => item.id === editId);
      const updateDecryptGroup = { ...decryptGroup };
      updateDecryptGroup.collectionData[editRecordIndex] = {
        id: updateDecryptGroup.collectionData[editRecordIndex].id,
        name: inputEditName.value,
        url: inputEditUrl.value,
        email: inputEditEmail.value,
        password: inputEditPassword.value,
        description: inputEditDescription.value,
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), inputDecryptPassword.value);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      closeRecord();
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  const editRecordActive = (id: string) => {
    if (!decryptGroup) return;

    setPopupEdit(true);
    setEditId(id);
    const toEditRecord = decryptGroup.collectionData.find((item) => item.id === id);

    if (!toEditRecord) return;

    inputEditName.setValue(toEditRecord.name);
    inputEditUrl.setValue(toEditRecord.url);
    inputEditEmail.setValue(toEditRecord.email);
    inputEditPassword.setValue(toEditRecord.password);
    inputEditDescription.setValue(toEditRecord.description);
  };

  const closeRecord = () => {
    setPopupEdit(false);
    inputEditName.dropState();
    inputEditUrl.dropState();
    inputEditEmail.dropState();
    inputEditPassword.dropState();
    inputEditDescription.dropState();
    setEditId('');
  };

  return (
    <div className="Collection">
      {isLoading && <LoaderDefault />}

      {group && !decryptGroup && (
        <FormDefault
          title={group.data === '' ? 'Generate collection' : 'Decrypt collection'}
          alone
          onlyButtonClose
          onSubmit={submit}
          formValid={formDecryptCollection.valid}
          errorText={formDecryptCollection.errorText}
          onClose={close}
        >
          <InputText
            title="Password"
            error={inputDecryptPassword.error}
            onChange={inputDecryptPassword.onChange}
            value={inputDecryptPassword.value}
            onBlur={inputDecryptPassword.onBlur}
          />
        </FormDefault>
      )}

      {group && decryptGroup && (
        <TableDefault decryptGroup={decryptGroup} onDelete={deleteRecord} onEdit={editRecordActive} />
      )}

      {popupEdit && (
        <FormDefault
          title="edit"
          onSubmit={editRecord}
          formValid={formEditRecord.valid}
          errorText={formEditRecord.errorText}
          onClose={closeRecord}
        >
          <InputText
            title="Name"
            error={inputEditName.error}
            onChange={inputEditName.onChange}
            value={inputEditName.value}
            onBlur={inputEditName.onBlur}
          />
          <InputText
            title="URL"
            error={inputEditUrl.error}
            onChange={inputEditUrl.onChange}
            value={inputEditUrl.value}
            onBlur={inputEditUrl.onBlur}
          />
          <InputText
            title="Email"
            error={inputEditEmail.error}
            onChange={inputEditEmail.onChange}
            value={inputEditEmail.value}
            onBlur={inputEditEmail.onBlur}
          />
          <InputText
            title="Password"
            error={inputEditPassword.error}
            onChange={inputEditPassword.onChange}
            value={inputEditPassword.value}
            onBlur={inputEditPassword.onBlur}
          />
          <InputText
            title="Description"
            error={inputEditDescription.error}
            onChange={inputEditDescription.onChange}
            value={inputEditDescription.value}
            onBlur={inputEditDescription.onBlur}
          />
        </FormDefault>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

export default Collection;
