import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { PATH_DATA, PATH_ERROR } from '../../routes/paths';

export default function DataDecryptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  const [name, setName] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');

  useEffect(() => {
    setName('');
    setInputPassword('');

    if (id) {
      const checkId = uuid.check(id);

      if (checkId) getById();
      else navigate(PATH_ERROR[404]);
    }
  }, [id]);

  const createNewCollection = async () => {
    if (!name || !inputPassword || !passCollectionContext) return;

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
    navigate(`${PATH_DATA.DECRYPT}/${res.id}`);
  };

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

    navigate(`${PATH_DATA.VIEW}/${id}`);
  };

  const submit = async () => {
    if (!id) await createNewCollection();
    if (id) await decryptCollection();
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === 'passCollectionName') setName(e.target.value);
    if (e.target.name === 'passCollectionPassword') setInputPassword(e.target.value);
  };

  return (
    <div>
      {!id && <input name="passCollectionName" type="text" placeholder="Name" onChange={changeInput} value={name} />}

      <input
        name="passCollectionPassword"
        type="text"
        placeholder="password"
        onChange={changeInput}
        value={inputPassword}
      />

      <button onClick={submit}>{id ? 'Decrypt' : 'Create'}</button>
    </div>
  );
}
