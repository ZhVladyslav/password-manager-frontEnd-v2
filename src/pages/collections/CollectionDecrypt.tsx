import React, { useEffect } from 'react';
import { FormDefault, InputText, useFormDefault, useInputText } from '../../componentsNew';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import { decrypt, encrypt, uuid, uuidHash } from '../../utils/crypto';

// ----------------------------------------------------------------------

interface IProps {
  group: IGetByIdGroups_Res | null;
  setDecryptGroup: (data: IDecryptGrout | null) => void;
  setGroup: (data: IGetByIdGroups_Res | null) => void;
  setDecryptPassword: (data: string | null) => void;
}

// ----------------------------------------------------------------------

const CollectionDecrypt: React.FC<IProps> = ({ group, setDecryptGroup, setGroup, setDecryptPassword }) => {
  const inputDecryptPassword = useInputText({ reg: /^[A-Za-z0-9]{1,128}$/, errorText: 'Error' });
  const formDecryptCollection = useFormDefault({ inputs: [inputDecryptPassword.valid] });

  useEffect(() => {
    setDecryptPassword(null);
  }, []);

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
    setDecryptPassword(inputDecryptPassword.value);
  };

  const close = () => {
    setGroup(null);
    setDecryptGroup(null);
    setDecryptPassword(null);
  };

  if (!group) return <></>;

  return (
    <FormDefault
      title={group.data === '' ? 'Generate collection' : `Decrypt collection: ${group.name}`}
      alone
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
  );
};

// ----------------------------------------------------------------------

export default CollectionDecrypt;
