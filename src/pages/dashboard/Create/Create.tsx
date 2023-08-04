import React, { useEffect, useState } from 'react';
import { ButtonDefault, InputText, useInputText } from '../../../components';
import { useForm } from '../../../hooks/useForm';
import { collectionService } from '../../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../../types/collectionType';
import { IDecryptGrout, IDecryptGroutRecord } from '../../../types/decryptGroupType';
import { decrypt, encrypt, uuid } from '../../../utils/crypto';
import './Create.scss';

// ----------------------------------------------------------------------

interface IProps {
  addRecord: IDecryptGroutRecord | null;
  onClose: () => void;
  password: string | null;

  decryptGroup: IDecryptGrout | null;
  groupById: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroupById: (data: IGetByIdGroups_Res | null) => void;
}

// ----------------------------------------------------------------------

const Create: React.FC<IProps> = ({
  addRecord,
  onClose,
  password,
  decryptGroup,
  groupById,
  setDecryptGroup,
  setGroupById,
}) => {
  const inputEditName = useInputText({ reg: /^[A-Za-z0-9 ]{0,128}$/, errorText: 'Error' });
  const inputEditUrl = useInputText({ reg: /^[A-Za-z0-9 .]{0,128}$/, errorText: 'Error' });
  const inputEditEmail = useInputText({ reg: /^[A-Za-z0-9 .@]{0,128}$/, errorText: 'Error' });
  const inputEditPassword = useInputText({ reg: /^[A-Za-z0-9 ]{0,128}$/, errorText: 'Error' });
  const inputEditDescription = useInputText({ reg: /^[A-Za-z0-9 ]{0,128}$/, errorText: 'Error' });
  const formEditRecord = useForm({
    inputs: [
      inputEditName.valid,
      inputEditUrl.valid,
      inputEditEmail.valid,
      inputEditPassword.valid,
      inputEditDescription.valid,
    ],
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!addRecord) return;

    if (addRecord.id === '') {
      setIsEdit(false);
    } else {
      setIsEdit(true);
      inputEditName.setValue(addRecord.name);
      inputEditUrl.setValue(addRecord.url);
      inputEditEmail.setValue(addRecord.email);
      inputEditPassword.setValue(addRecord.password);
      inputEditDescription.setValue(addRecord.description);
    }
  }, []);

  // Add record
  const addRecordFunc = async () => {
    if (!password || !decryptGroup || !groupById) return;
    try {
      decrypt(groupById.data, password);
      const updateDecryptGroup = { ...decryptGroup };
      updateDecryptGroup.collectionData.push({
        id: uuid(),
        name: inputEditName.value,
        url: inputEditUrl.value,
        email: inputEditEmail.value,
        password: inputEditPassword.value,
        description: inputEditDescription.value,
      });
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), password);
      const result = await collectionService.editData(groupById.id, encryptUpGroup);
      if (result.err) return;
      setDecryptGroup(updateDecryptGroup);
      setGroupById({ ...groupById, data: encryptUpGroup });
      onClose();
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  // Edit record
  const editRecord = async () => {
    if (!password || !decryptGroup || !groupById || !addRecord) return;
    try {
      decrypt(groupById.data, password);
      const editRecordIndex = decryptGroup.collectionData.findIndex((item) => item.id === addRecord.id);
      const updateDecryptGroup = { ...decryptGroup };
      updateDecryptGroup.collectionData[editRecordIndex] = {
        id: addRecord.id,
        name: inputEditName.value,
        url: inputEditUrl.value,
        email: inputEditEmail.value,
        password: inputEditPassword.value,
        description: inputEditDescription.value,
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), password);
      const result = await collectionService.editData(groupById.id, encryptUpGroup);
      if (result.err) return;
      setDecryptGroup(updateDecryptGroup);
      setGroupById({ ...groupById, data: encryptUpGroup });
      onClose();
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formEditRecord.valid) return;

    if (isEdit) {
      editRecord();
    } else {
      addRecordFunc();
    }
  };

  return (
    <div className="Edit-Container-Close" onClick={() => onClose()}>
      <div className="Edit-Container" onClick={(e) => e.stopPropagation()}>
        <span className="title">Add record</span>
        <form onSubmit={submit}>
          <div className="inputBlock">
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
          </div>
          <div className="buttonBlock">
            <ButtonDefault title="Cancel" style="border" type="button" onClick={() => onClose()} />
            <ButtonDefault title={isEdit ? 'Edit record' : 'Add record'} style="bg Blue" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Create;
