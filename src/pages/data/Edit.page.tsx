import React, { useState, useEffect } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';
import { IDecryptData, IDecryptDataMain, IDecryptDataRecord } from '../../types/decryptData.type';
import { uuid } from '../../utils/uuid';

export default function DataEditPage() {
  const [newDataName, setNewDataName] = useState<string>('');
  const [newFieldsNameList, setNewFieldsNameList] = useState<string[]>(['']);
  const [newDataRecords, setNewDataRecords] = useState<IDecryptDataRecord[]>([
    { id: uuid.generate(), name: ``, url: ``, email: ``, password: ``, description: `` },
  ]);

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

    setNewFieldsNameList((prom) => [...prom, 'qwe']);
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

  // input

  const addInput = (id: string, i: number) => {
    if (newFieldsNameList[i] === '') return;

    setNewDataRecords((prom) =>
      prom.map((item) => {
        if (item.id === id) {
          const test = item;
          test[newFieldsNameList[i]] = '';
          return test;
        }
        return item;
      }),
    );
  };

  const writeInputName = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    setNewFieldsNameList((prom) =>
      prom.map((item, index) => {
        if (index === i) {
          return e.target.value;
        }
        return item;
      }),
    );
  };

  const findAddInputValue = (i: number) => {
    return newFieldsNameList[i];
  };

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
      {newDataRecords.map((item, i) => (
        <div key={item.id}>
          {Object.keys(item).map((itemKeys) => {
            if (itemKeys === 'id') return <span key={`${item.id}_${itemKeys}`}></span>;
            return (
              <span key={`${item.id}_${itemKeys}`}>
                <input
                  type="text"
                  onChange={(e) => inputDataInRecord(e, item.id, itemKeys)}
                  value={findValue(item.id, itemKeys)}
                />
              </span>
            );
          })}

          <button onClick={() => addInput(item.id, i)}>Add</button>
          <input type="text" onChange={(e) => writeInputName(e, i)} value={findAddInputValue(i)} />
        </div>
      ))}
      <div>
        <button onClick={addRecord}>Add</button>

        <button onClick={createData}>Create</button>
      </div>
    </>
  );
}
