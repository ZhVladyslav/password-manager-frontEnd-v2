import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PATH_PASS_COLLECTION_DECRYPT, PATH_PASS_COLLECTION } from '../../routes/paths';

export default function DataCreatePage() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  const createNewCollection = async () => {
    if (!name || !inputPassword) return;

    const dataToEncrypt: IDecryptData = {
      id: uuid.generate(),
      payload: uuid.generate(),
      version: 'v1',
      date: { createData: new Date(), lastUpdate: new Date() },
      collectionData: [],
    };

    const encryptData = cryptoV1.encrypt({ key: inputPassword, str: JSON.stringify(dataToEncrypt) });
    if (!encryptData) return;

    const res = await passCollectionService.create({ name, encryptData });
    if (!res) return;
    navigate(`${PATH_PASS_COLLECTION_DECRYPT.DECRYPT}/${res.id}`);
  };

  const submit = async () => {
    await createNewCollection();
  };

  return (
    <div>
      <input
        name="passCollectionName"
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />

      <input
        name="passCollectionPassword"
        type="text"
        placeholder="password"
        onChange={(e) => setInputPassword(e.target.value)}
        value={inputPassword}
      />

      <button onClick={submit}>Create</button>
      <button onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}>To list</button>
    </div>
  );
}
