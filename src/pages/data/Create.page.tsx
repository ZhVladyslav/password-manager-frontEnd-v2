import React from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';

export default function DataCreatePage() {
  const createData = async () => {
    const name = 'test 2';
    const encryptData = cryptoV1.encrypt({ key: 'test', str: 'top secret' });
    if (!encryptData) return;
    await passCollectionService.create({ name, encryptData });
  };

  return (
    <>
      DataCreatePage
      <button onClick={createData}>Create</button>
    </>
  );
}
