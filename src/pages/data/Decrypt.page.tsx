import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR, PATH_PASS_COLLECTION } from '../../routes/paths';

export default function DataDecryptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  const [inputPassword, setInputPassword] = useState<string>('');

  useEffect(() => {
    if (!id || !uuid.check(id)) {
      navigate(PATH_ERROR[404]);
      return;
    }

    getById();
  }, []);

  const getById = async () => {
    if (!id || !passCollectionContext) return;

    const res = await passCollectionService.getById({ id });
    if (!res) return;

    passCollectionContext.setCollectionInDb(res);
  };

  const decryptCollection = async () => {
    if (!id || !passCollectionContext || !passCollectionContext.collectionInDb) return;

    const res = cryptoV1.decrypt({ key: inputPassword, str: passCollectionContext.collectionInDb.encryptData });
    if (!res) return;

    const decryptData = JSON.parse(res) as IDecryptData;
    passCollectionContext.setDecryptCollectionData(decryptData);
    passCollectionContext.setPassword(inputPassword);

    navigate(`${PATH_PASS_COLLECTION_DECRYPT.VIEW}/${id}`);
  };

  const submit = async () => {
    if (id) await decryptCollection();
  };

  return (
    <div>
      <input
        name="passCollectionPassword"
        type="text"
        placeholder="password"
        onChange={(e) => setInputPassword(e.target.value)}
        value={inputPassword}
      />

      <button onClick={submit}>{id ? 'Decrypt' : 'Create'}</button>
      <button onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}>To list</button>
    </div>
  );
}
