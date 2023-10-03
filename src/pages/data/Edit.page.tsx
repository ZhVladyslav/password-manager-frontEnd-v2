import React, { useState, useEffect, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';
import { IDecryptData, IDecryptDataMain, IDecryptDataRecord } from '../../types/decryptData.type';
import { uuid } from '../../utils/uuid';
import { useNavigate, useParams } from 'react-router-dom';
import { PATH_ERROR } from '../../routes/paths';
import { PassCollectionContext } from '../../layouts/Collection.layout';

export default function DataEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);

  const [dataName, setDataName] = useState<string>('');
  const [newFieldsNameList, setNewFieldsNameList] = useState<string[]>([]);
  const [newDataRecords, setNewDataRecords] = useState<IDecryptDataRecord[]>([]);

  useEffect(() => {
    if (
      !id ||
      !passCollectionContext ||
      !passCollectionContext.collectionInDb ||
      !passCollectionContext.decryptCollectionData
    ) {
      return;
    }

    const checkId = uuid.check(id);
    if (!checkId) navigate(PATH_ERROR[404]);

    setDataName(passCollectionContext.collectionInDb.name);
    setNewDataRecords(passCollectionContext.decryptCollectionData.collectionData);
    const generateArray = new Array(passCollectionContext.decryptCollectionData.collectionData.length).fill('');
    setNewFieldsNameList(generateArray);
  }, [id]);

  const updateData = async () => {
    if (!newDataRecords || !id || !passCollectionContext || !passCollectionContext.collectionInDb) return;

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

    await passCollectionService.editEncryptData({ id, encryptData: encryptData });

    if (dataName !== passCollectionContext.collectionInDb.name) {
      await passCollectionService.editName({ id, name: dataName });
    }
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

  // new input

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
      <input type="text" placeholder="name collection" onChange={(e) => setDataName(e.target.value)} value={dataName} />
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

        <button onClick={updateData}>Update</button>
      </div>
    </>
  );
}
