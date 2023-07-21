import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { PATH_COLLECTION, PATH_ERROR, PATH_MAIN } from '../../routes/paths';
import { collectionService } from '../../services/collectionServices';
import { IGetByIdGroups_Res } from '../../types/collectionType';
import CryptoJS from 'crypto-js';

// ----------------------------------------------------------------------

export default function CollectionViewPage() {
  const [collection, setCollection] = useState<IGetByIdGroups_Res>();
  const [originPasswords, setOriginPasswords] = useState('');
  const [encryptedPasswords, setEncryptedPasswords] = useState('');
  const [decryptedPasswords, setDecryptedPasswords] = useState('');
  const [password, setPassword] = useState('');
  const { id } = useParams();

  if (!id) return <Navigate to={PATH_ERROR.error404} />;

  const getCollection = async () => {
    const data = await collectionService.getById(id);
    if (data.err) return;
    setCollection(data.res);
  };

  const setStar = async () => {
    if (!collection) return;

    const data = await collectionService.editInfo({
      passCollectionId: collection.id,
      name: collection.name,
      star: !collection.star,
    });
    if (data.err) return;
    setCollection({ ...collection, star: !collection.star });
  };

  useEffect(() => {
    getCollection();
  }, []);

  //
  //
  //

  const encryptData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!collection) return;

    const encrypted = CryptoJS.AES.encrypt(originPasswords, password).toString();
    setEncryptedPasswords(encrypted);

    const data = await collectionService.editData(collection.id, encrypted);
    if (data.err) return;
    setCollection({ ...collection, data: encrypted });
  };

  const decryptData = () => {
    if (!collection) return;

    const decrypted = CryptoJS.AES.decrypt(collection?.data, password).toString(CryptoJS.enc.Utf8);
    setDecryptedPasswords(decrypted);
  };

  return (
    <>
      <Link to={PATH_MAIN.home}>To home</Link> <br />
      <Link to={PATH_COLLECTION.list}>Go to list collection</Link> <br />
      <hr />
      <div>
        <span>
          <b>{`id: `}</b>
          {`${collection?.id}`}
        </span>
        <br />
        <span>
          <b>{`name: `}</b>
          {`${collection?.name}`}
        </span>
        <br />
        <span>
          <b>{`star: `}</b>
          <button onClick={setStar}>{`${collection?.star}`}</button>
        </span>
        <br />
        <span>
          <b>{`passwords: `}</b>
          {`${collection?.data}`}
        </span>
        <br />
        <br />
        <br />
      </div>
      {/*  */}
      {/*  */}
      {/*  */}
      password to decrypt
      <input
        type="text"
        name="passwordToCrypt"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        value={password}
      />
      <br />
      {/*  */}
      {/*  */}
      {/*  */}
      <form onSubmit={encryptData}>
        to encrypt and save
        <input
          type="text"
          name="encryptPass"
          onChange={(e: ChangeEvent<HTMLInputElement>) => setOriginPasswords(e.target.value)}
          value={originPasswords}
        />
        <br />
        <button type="submit">encryptData</button>
      </form>
      {/*  */}
      {/*  */}
      {/*  */}
      <button onClick={() => decryptData()}>DecryptData</button>
      <br />
      <span>{decryptedPasswords}</span>
    </>
  );
}
