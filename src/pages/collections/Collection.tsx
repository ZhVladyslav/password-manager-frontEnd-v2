import React, { useState, useEffect } from 'react';
import { FormDefault, InputText, LoaderDefault, useFormDefault, useInputText } from '../../componentsNew';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import { IDecryptGrout } from '../../types/decryptGroupType';
import { decrypt, encrypt, uuidHash } from '../../utils/crypto';
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
  const inputDecryptPassword = useInputText({ reg: /^[A-Za-z0-9]{1,128}$/, errorText: 'Error' });
  const formDecryptCollection = useFormDefault({ inputs: [inputDecryptPassword.valid] });

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
          name: 'demo',
          userFields: [
            { name: 'Email', text: '...@gmail.com', hidden: false },
            { name: 'Password', text: '1111', hidden: true },
          ],
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

  useEffect(() => {
    inputDecryptPassword.dropState();
  }, [group]);

  return (
    <div className="Collection">
      {isLoading && <LoaderDefault />}
      {/*  */}
      {group && !decryptGroup && (
        <FormDefault
          title={group.data === '' ? 'Generate collection' : 'Decrypt collection'}
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
      )}
    </div>
  );
};

// ----------------------------------------------------------------------

export default Collection;
