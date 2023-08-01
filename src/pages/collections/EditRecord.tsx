import React, { useEffect } from 'react';
import { FormDefault, InputText, useFormDefault, useInputText } from '../../componentsNew';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import { decrypt, encrypt, uuid } from '../../utils/crypto';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  decryptGroup: IDecryptGrout | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  setPopupEditId: (data: string | null) => void;
  setPopupCreate: (data: boolean) => void;
  decryptPassword: string | null;
  recordId: string | null;
  isEdit?: string | null;
}

// ----------------------------------------------------------------------

const EditRecord: React.FC<IProps> = ({
  decryptPassword,
  recordId,
  isEdit,
  group,
  decryptGroup,
  setDecryptGroup,
  setGroup,
  setPopupCreate,
  setPopupEditId,
}) => {
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

  useEffect(() => {
    if (!decryptGroup) return;

    if (isEdit) {
      const toEditRecord = decryptGroup.collectionData.find((item) => item.id === recordId);
      if (!toEditRecord) return;

      inputEditName.setValue(toEditRecord.name);
      inputEditUrl.setValue(toEditRecord.url);
      inputEditEmail.setValue(toEditRecord.email);
      inputEditPassword.setValue(toEditRecord.password);
      inputEditDescription.setValue(toEditRecord.description);
    }
  }, []);

  // edit record
  const editRecord = async () => {
    if (!decryptPassword || !decryptGroup || !group) return;
    try {
      decrypt(group.data, decryptPassword);
      const editRecordIndex = decryptGroup.collectionData.findIndex((item) => item.id === recordId);
      const updateDecryptGroup = { ...decryptGroup };
      updateDecryptGroup.collectionData[editRecordIndex] = {
        id: updateDecryptGroup.collectionData[editRecordIndex].id,
        name: inputEditName.value,
        url: inputEditUrl.value,
        email: inputEditEmail.value,
        password: inputEditPassword.value,
        description: inputEditDescription.value,
      };
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      setPopupEditId(null);
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  // Create
  const createRecord = async () => {
    if (!decryptPassword || !decryptGroup || !group) return;
    try {
      decrypt(group.data, decryptPassword);
      const updateDecryptGroup = { ...decryptGroup };
      updateDecryptGroup.collectionData.push({
        id: uuid(),
        name: inputEditName.value,
        url: inputEditUrl.value,
        email: inputEditEmail.value,
        password: inputEditPassword.value,
        description: inputEditDescription.value,
      });
      const encryptUpGroup = encrypt(JSON.stringify(updateDecryptGroup), decryptPassword);
      const result = await collectionService.editData(decryptGroup.id, encryptUpGroup);
      if (result.err) return;
      setGroup({ ...group, data: encryptUpGroup });
      setDecryptGroup(updateDecryptGroup);
      setPopupCreate(false);
    } catch (err) {
      console.error('Error password to decrypt');
    }
  };

  const submit = () => {
    if (isEdit) {
      editRecord();
    } else {
      createRecord();
    }
  };

  const close = () => {
    if (isEdit) {
      setPopupEditId(null);
    } else {
      setPopupCreate(false);
    }
  };

  return (
    <FormDefault
      title={isEdit ? 'Edit record' : 'Add record'}
      onSubmit={submit}
      formValid={formEditRecord.valid}
      errorText={formEditRecord.errorText}
      onClose={close}
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
  );
};

// ----------------------------------------------------------------------

export default EditRecord;
