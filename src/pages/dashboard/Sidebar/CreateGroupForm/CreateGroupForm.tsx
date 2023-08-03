import React from 'react';
import { InputText, useInputText } from '../../../../components';
import { useForm } from '../../../../hooks/useForm';
import { FormPopup } from '../../../../modules';
import { collectionService } from '../../../../services/collectionServices';
import { IDecryptGrout } from '../../../../types/decryptGroupType';
import { encrypt, uuid, uuidHash } from '../../../../utils/crypto';

// ----------------------------------------------------------------------

interface IProps {
  setIsCreate: (data: boolean) => void;
  getAllGroups: () => Promise<void>;
  getGroupById: (data: string) => Promise<void>;
}

// ----------------------------------------------------------------------

const CreateGroupForm: React.FC<IProps> = ({ setIsCreate, getAllGroups, getGroupById }) => {
  const nameInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid name' });
  const passwordInput = useInputText({ reg: /^[0-9A-Za-z @]*$/, errorText: 'Invalid password' });
  const form = useForm({ inputs: [nameInput.valid, passwordInput.valid] });

  /* ----------------  Create group  ---------------- */

  const submit = async () => {
    const resultCreate = await collectionService.create({ name: nameInput.value });
    if (resultCreate.err) {
      setIsCreate(false);
      return;
    }

    const groupDefaultData: IDecryptGrout = {
      id: uuid(),
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

    const encryptNewGroup: string = encrypt(JSON.stringify(groupDefaultData), passwordInput.value);
    const resultEditData = await collectionService.editData(resultCreate.res.id, encryptNewGroup);
    if (resultEditData.err) {
      setIsCreate(false);
      return;
    }
    await getAllGroups();
    await getGroupById(resultCreate.res.id);
    setIsCreate(false);
  };

  return (
    <div className="CreateGroupForm-Container">
      <FormPopup
        onClose={() => setIsCreate(false)}
        onSubmit={() => submit()}
        form={form}
        title="Create new group"
        submitTitle="Create"
      >
        <InputText
          title="Name"
          error={nameInput.error}
          onBlur={nameInput.onBlur}
          onChange={nameInput.onChange}
          value={nameInput.value}
        />
        <InputText
          title="Password"
          error={passwordInput.error}
          onBlur={passwordInput.onBlur}
          onChange={passwordInput.onChange}
          value={passwordInput.value}
        />
      </FormPopup>
    </div>
  );
};

// ----------------------------------------------------------------------

export default CreateGroupForm;
