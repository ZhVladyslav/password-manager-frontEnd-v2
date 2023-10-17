import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PATH_PASS_COLLECTION_DECRYPT, PATH_PASS_COLLECTION } from '../../routes/paths';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Form from '../../components/Form_1.component';

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
      <Form
        title="Create"
        smallTitle="Create new password collection"
        submitName="Create"
        onSubmit={submit}
        backName="To list"
        onBack={() => navigate(PATH_PASS_COLLECTION.LIST)}
      >
        <InputText title="Name" name="name" inputHook={nameInput} />
        <InputText title="Password" name="password" inputHook={passwordInput} />
      </Form>
    </>
  );
}
