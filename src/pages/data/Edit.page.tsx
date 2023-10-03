import React, { useState, useEffect, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';
import { IDecryptData, IDecryptDataMain, IDecryptDataRecord } from '../../types/decryptData.type';
import { uuid } from '../../utils/uuid';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR } from '../../routes/paths';
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
    setNewDataRecords(copyArray());

    const generateArray = new Array(passCollectionContext.decryptCollectionData.collectionData.length).fill('');
    setNewFieldsNameList(generateArray);
  }, [id]);

  const copyArray = () => {
    if (!passCollectionContext || !passCollectionContext.decryptCollectionData) return [];

    return passCollectionContext.decryptCollectionData.collectionData.map((item) => {
      const copy: IDecryptDataRecord = { id: '', name: '', url: '', email: '', password: '', description: '' };

      Object.keys(item).map((keyItem) => {
        copy[keyItem] = item[keyItem];
      });

      return copy;
    });
  };

  const updateData = async () => {
    if (
      !newDataRecords ||
      !id ||
      !passCollectionContext ||
      !passCollectionContext.collectionInDb ||
      !passCollectionContext.decryptCollectionData
    )
      return;

    const dataToEncrypt: IDecryptData = {
      id: uuid.generate(),
      payload: uuid.generate(),
      version: 'v1',
      date: {
        createData: passCollectionContext.decryptCollectionData.date.createData,
        lastUpdate: new Date(),
      },
      collectionData: newDataRecords,
    };

    const encryptData = cryptoV1.encrypt({ key: passCollectionContext.password, str: JSON.stringify(dataToEncrypt) });
    if (!encryptData) return;

    await passCollectionService.editEncryptData({ id, encryptData: encryptData });

    if (dataName !== passCollectionContext.collectionInDb.name) {
      await passCollectionService.editName({ id, name: dataName });
      passCollectionContext.collectionInDb.name = dataName;
    }

    passCollectionContext.decryptCollectionData.collectionData = newDataRecords;
    passCollectionContext.collectionInDb.encryptData = encryptData;

    navigate(`${PATH_PASS_COLLECTION_DECRYPT.VIEW}/${id}`);
  };

  const addRecord = () => {
    setNewDataRecords((prom) => [
      ...prom,
      { id: uuid.generate(), name: '', email: '', password: '', url: '', description: '' },
    ]);

    setNewFieldsNameList((prom) => [...prom, '']);
  };

  const deleteRecord = (id: string) => {
    setNewDataRecords((prom) => prom.filter((item) => item.id !== id));
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

  const deleteInput = (id: string, itemKeys: string) => {
    setNewDataRecords((prom) =>
      prom.map((item) => {
        if (item.id === id) {
          delete item[itemKeys];
          return item;
        }
        return item;
      }),
    );
  };

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <Navigate to={PATH_PASS_COLLECTION.LIST} />;

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
                {itemKeys}
                <input
                  type="text"
                  onChange={(e) => inputDataInRecord(e, item.id, itemKeys)}
                  value={findValue(item.id, itemKeys)}
                />
                {itemKeys === 'name' ||
                itemKeys === 'email' ||
                itemKeys === 'password' ||
                itemKeys === 'url' ||
                itemKeys === 'description' ? (
                  <></>
                ) : (
                  <button onClick={() => deleteInput(item.id, itemKeys)}>X</button>
                )}
              </span>
            );
          })}

          <button onClick={() => addInput(item.id, i)}>Add</button>
          <input type="text" onChange={(e) => writeInputName(e, i)} value={findAddInputValue(i)} />
          <button onClick={() => deleteRecord(item.id)}>Delete</button>
        </div>
      ))}
      <div>
        <button onClick={addRecord}>Add</button>

        <button onClick={updateData}>Update</button>

        <button onClick={() => navigate(`${PATH_PASS_COLLECTION_DECRYPT.VIEW}/${id}`)}>Close</button>
      </div>
    </>
  );
}
