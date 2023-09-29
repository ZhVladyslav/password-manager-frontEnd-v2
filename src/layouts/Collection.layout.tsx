import React, { useState, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { IPassCollection } from '../types/passCollection.type';
import { IDecryptData } from '../types/decryptData.type';

interface IPassCollectionContext {
  collectionInDb: IPassCollection | null;
  setCollectionInDb: (data: IPassCollection | null) => void;
  decryptCollectionData: IDecryptData | null;
  setDecryptCollectionData: (data: IDecryptData | null) => void;
  password: string;
  setPassword: (str: string) => void;
}

export const PassCollectionContext = createContext<IPassCollectionContext | null>(null);

export default function CollectionLayout() {
  const [collectionInDb, setCollectionInDb] = useState<IPassCollection | null>(null);
  const [decryptCollectionData, setDecryptCollectionData] = useState<IDecryptData | null>(null);
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <PassCollectionContext.Provider
        value={{
          collectionInDb,
          setCollectionInDb,
          decryptCollectionData,
          setDecryptCollectionData,
          password,
          setPassword,
        }}
      >
        <Outlet />
      </PassCollectionContext.Provider>
    </>
  );
}
