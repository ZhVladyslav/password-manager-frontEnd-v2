import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PATH_PASS_COLLECTION_DECRYPT, PATH_PASS_COLLECTION } from '../../routes/paths';
import style from './create.page.module.scss';
import InputText from '../../components/InputText.component';
import Button from '../../components/Button.component';
import { useInputText } from '../../hooks/useInputText.hook';

export default function DataCreatePage() {
  const navigate = useNavigate();
  const nameInput = useInputText();
  const passwordInput = useInputText();

  const createNewCollection = async () => {
    if (!nameInput.value || !passwordInput.value) return;

    const dataToEncrypt: IDecryptData = {
      id: uuid.generate(),
      payload: uuid.generate(),
      version: 'v1',
      date: { createData: new Date(), lastUpdate: new Date() },
      collectionData: [],
    };

    const encryptData = cryptoV1.encrypt({ key: passwordInput.value, str: JSON.stringify(dataToEncrypt) });
    if (!encryptData) return;

    const res = await passCollectionService.create({ name: nameInput.value, encryptData });
    if (!res) return;
    navigate(`${PATH_PASS_COLLECTION_DECRYPT.DECRYPT}/${res.id}`);
  };

  const submit = async () => {
    await createNewCollection();
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.content_container}>
          <div className={style.content_block}>
            <div className={style.textBlock}>
              <h1>Create</h1>
              <h2>Create new password collection</h2>
            </div>
            <form onSubmit={submit}>
              <div className={style.inputBlock}>
                <InputText title="Name" name="name" inputHook={nameInput} />
                <InputText title="Password" name="password" inputHook={passwordInput} />
              </div>
              <div className={style.formButton}>
                <Button type="submit" title="Create" />
              </div>
              <div className={style.linkButton}>
                <span onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}>To list</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
