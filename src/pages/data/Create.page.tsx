import React, { useState, useEffect } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';
import { IDecryptData, IDecryptDataMain, IDecryptDataRecord } from '../../types/decryptData.type';
import { uuid } from '../../utils/uuid';

export default function DataCreatePage() {
  const [newDataName, setNewDataName] = useState<string>('');
  const [newDataRecords, setNewDataRecords] = useState<IDecryptDataRecord[]>([]);

  useEffect(() => {
    const count = 100;
    const generatedArray: IDecryptDataRecord[] = Array.from({ length: count }, (_, index) => ({
      id: uuid.generate(),
      name: `stdfad asri ng_${index}`,
      url: `test.com ${index}`,
      email: `userEmail@gmail.com ${index}`,
      password: `strsdfgasdafaffaerq45g56465746A6n37an47&%$%&sdfgsdfgsing_${index}`,
      description: `stdgfsdSDJFGS LDKFBGSKLDHGLKSJHLGKJL Bsglkdgb ajkbglajdbg labg afgsdfgsdfgsdgring_${index}`,
    }));

    setNewDataRecords(generatedArray);
  }, []);

  const createData = async () => {
    if (!newDataRecords) return;

    const dataToEncrypt: IDecryptData = {
      id: uuid.generate(),
      payload: uuid.generate(),
      version: 'v1',
      date: {
        createData: new Date(),
        lastUpdate: new Date(),
      },
      collectionData: newDataRecords,
    };

    const encryptData = cryptoV1.encrypt({ key: 'test', str: JSON.stringify(dataToEncrypt) });
    if (!encryptData) return;
    await passCollectionService.create({ name: newDataName, encryptData });
  };

  const addRecord = () => {
    setNewDataRecords((prom) => [
      ...prom,
      { id: uuid.generate(), name: '', email: '', password: '', url: '', description: '' },
    ]);
  };

  const findValue = (id: string, name: string) => {
    const value = newDataRecords.find((item) => item.id === id);
    if (!value) return '';
    return value[name];
  };

  const inputDataInRecord = (e: React.ChangeEvent<HTMLInputElement>, id: string, name: string) => {
    setNewDataRecords((prom) =>
      prom.map((item) => {
        if (id === item.id) {
          if (!(name in item)) return item;
          item[name] = e.target.value;
          return item;
        }
        return item;
      }),
    );
  };

  console.log(newDataRecords);

  return (
    <>
      <input
        type="text"
        placeholder="name collection"
        onChange={(e) => setNewDataName(e.target.value)}
        value={newDataName}
      />{' '}
      <br />
      <hr />
      {newDataRecords.map((item) => (
        <div key={item.id}>
          <input
            type="text"
            placeholder="name"
            onChange={(e) => inputDataInRecord(e, item.id, 'name')}
            value={findValue(item.id, 'name')}
          />
          <input
            type="text"
            placeholder="url"
            onChange={(e) => inputDataInRecord(e, item.id, 'url')}
            value={findValue(item.id, 'url')}
          />
          <input
            type="text"
            placeholder="email"
            onChange={(e) => inputDataInRecord(e, item.id, 'email')}
            value={findValue(item.id, 'email')}
          />
          <input
            type="text"
            placeholder="password"
            onChange={(e) => inputDataInRecord(e, item.id, 'password')}
            value={findValue(item.id, 'password')}
          />
          <input
            type="text"
            placeholder="description"
            onChange={(e) => inputDataInRecord(e, item.id, 'description')}
            value={findValue(item.id, 'description')}
          />
        </div>
      ))}
      <div>
        <button onClick={addRecord}>Add</button>

        <button onClick={createData}>Create</button>
      </div>
    </>
  );
}
