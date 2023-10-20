import React, { useState, useEffect, useContext } from 'react';
import { passCollectionService } from '../../services/passCollection.service';
import { cryptoV1 } from '../../utils/crypto.v1';
import { IDecryptData, IDecryptDataMain, IDecryptDataRecord } from '../../types/decryptData.type';
import { uuid } from '../../utils/uuid';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR } from '../../routes/paths';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import style from './edit.page.module.scss';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Table from '../../components/Table.component';
import Button from '../../components/Button.component';
import InputTextIndependent from '../../components/InputTextIndependent.component';

export default function DataEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);
  const inputName = useInputText();

  const [dataName, setDataName] = useState<string>('');
  const [newFieldsNameList, setNewFieldsNameList] = useState<string[]>([]);
  const [newDataRecords, setNewDataRecords] = useState<IDecryptDataRecord[]>([]);
  const [viewIndex, setViewIndex] = useState<number | null>(null);

  useEffect(() => {
    if (
      !id ||
      !passCollectionContext ||
      !passCollectionContext.collectionInDb ||
      !passCollectionContext.decryptCollectionData
    ) {
      navigate(PATH_PASS_COLLECTION.LIST);
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
    setNewDataRecords((prev) => [
      ...prev,
      { id: uuid.generate(), name: '', email: '', password: '', url: '', description: '' },
    ]);

    setNewFieldsNameList((prev) => [...prev, '']);
  };

  const deleteRecord = (id: string) => {
    setNewDataRecords((prev) => prev.filter((item) => item.id !== id));
  };

  const findValue = (id: string, name: string) => {
    const value = newDataRecords.find((item) => item.id === id);
    if (!value) return '';
    return value[name];
  };

  const inputDataInRecord = (e: React.ChangeEvent<HTMLInputElement>, id: string, name: string) => {
    setNewDataRecords((prev) =>
      prev.map((item) => {
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

    setNewDataRecords((prev) =>
      prev.map((item) => {
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
    setNewFieldsNameList((prev) =>
      prev.map((item, index) => {
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
    setNewDataRecords((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          delete item[itemKeys];
          return item;
        }
        return item;
      }),
    );
  };

  const viewRecord = (id: string) => {
    const index = newDataRecords.findIndex((item) => item.id === id);
    setViewIndex(index);
    console.log(newDataRecords[index]);
  };

  if (!passCollectionContext || !passCollectionContext.decryptCollectionData || !passCollectionContext.collectionInDb)
    return <Navigate to={PATH_PASS_COLLECTION.LIST} />;

  return (
    <>
      <div className={style.nameContainer}>
        <div className={style.inputBlock}>
          <InputText inputHook={inputName} title="Name" name="passCollection-name" />
        </div>

        <div className={style.buttonBlock}>
          <Button title="Add" onClick={addRecord} />
          <Button title="Update" onClick={updateData} />
          <Button title="Close" onClick={() => navigate(`${PATH_PASS_COLLECTION_DECRYPT.VIEW}/${id}`)} />
        </div>
      </div>

      <div className={style.main}>
        <Table head={['Name', 'Email', '']} size={{ width: 'calc(100vw - 400px)', height: 'calc(100vh - 110px)' }}>
          {newDataRecords.map((item, i) => (
            <tr key={item.id}>
              <td onClick={() => viewRecord(item.id)}>{item.name}</td>
              <td>{item.email}</td>
              <td></td>
            </tr>
          ))}
        </Table>

        <div className={style.sidebar}>
          {viewIndex !== null && (
            <div className={style.sidebar_container}>
              <h2>{newDataRecords[viewIndex].name ? newDataRecords[viewIndex].name : 'Name'}</h2>

              <InputTextIndependent
                title="Name"
                value={findValue(newDataRecords[viewIndex].id, 'name')}
                name="name"
                onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, 'name')}
                size="small"
              />

              <InputTextIndependent
                title="Url"
                value={findValue(newDataRecords[viewIndex].id, 'url')}
                name="url"
                onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, 'url')}
                size="small"
              />

              <InputTextIndependent
                title="Email"
                value={findValue(newDataRecords[viewIndex].id, 'email')}
                name="email"
                onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, 'email')}
                size="small"
              />

              <InputTextIndependent
                title="Password"
                value={findValue(newDataRecords[viewIndex].id, 'password')}
                name="password"
                onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, 'password')}
                size="small"
              />

              <InputTextIndependent
                title="Description"
                value={findValue(newDataRecords[viewIndex].id, 'description')}
                name="description"
                onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, 'description')}
                size="small"
              />

              {/*  */}

              {Object.keys(newDataRecords[viewIndex]).map((itemKeys, i) => {
                if (itemKeys === 'id') return null;
                if (itemKeys === 'name') return null;
                if (itemKeys === 'url') return null;
                if (itemKeys === 'email') return null;
                if (itemKeys === 'password') return null;
                if (itemKeys === 'description') return null;

                return (
                  <div key={i} className={style.additionalField}>
                    <InputTextIndependent
                      title={itemKeys}
                      value={findValue(newDataRecords[viewIndex].id, itemKeys)}
                      name={itemKeys}
                      onChange={(e) => inputDataInRecord(e, newDataRecords[viewIndex].id, itemKeys)}
                      size="small"
                    />

                    <Button title="Delete" onClick={() => deleteInput(newDataRecords[viewIndex].id, itemKeys)} />
                  </div>
                );
              })}

              {/*  */}

              <div className={style.additionalField}>
                <InputTextIndependent
                  title="New field name"
                  value={findAddInputValue(viewIndex)}
                  name="newFiled"
                  onChange={(e) => writeInputName(e, viewIndex)}
                  size="small"
                />

                <Button title="Add" onClick={() => addInput(newDataRecords[viewIndex].id, viewIndex)} />
              </div>

              {/* <div className={style.sidebarButtonBlock}>
                <Button title="Delete" onClick={() => deleteRecord(newDataRecords[viewIndex].id)} />
              </div> */}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
