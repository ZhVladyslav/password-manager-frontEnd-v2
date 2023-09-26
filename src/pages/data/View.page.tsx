import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { passCollectionService } from '../../services/passCollection.service';
import { IPassCollection } from '../../types/passCollection.type';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';

export default function DataViewPage() {
  const { id } = useParams();

  const [data, setData] = useState<IPassCollection | null>(null);
  const [decryptData, setDecryptData] = useState<IDecryptData | null>(null);

  const getById = async () => {
    if (!id) return;
    const res = await passCollectionService.getById({ id });
    if (!res) return;
    setData(res);
  };

  const decryptDataFunc = () => {
    if (!data) return;
    const res = cryptoV1.decrypt({ key: 'test', str: data.encryptData });
    console.log(res);
    
  };

  useEffect(() => {
    getById();
  }, []);

  useEffect(() => {
    decryptDataFunc();
  }, [data]);

  return (
    <>
      <div>
        <span>{data?.name}</span>
      </div>
    </>
  );
}
