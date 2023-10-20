import React, { useState, useEffect, useContext, FormEvent, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { uuid } from '../../utils/uuid';
import { IDecryptData } from '../../types/decryptData.type';
import { cryptoV1 } from '../../utils/crypto.v1';
import { passCollectionService } from '../../services/passCollection.service';
import { PassCollectionContext } from '../../layouts/Collection.layout';
import { PATH_PASS_COLLECTION_DECRYPT, PATH_ERROR, PATH_PASS_COLLECTION } from '../../routes/paths';
import { useInputText } from '../../hooks/useInputText.hook';
import InputText from '../../components/InputText.component';
import Form from '../../components/Form_1.component';

export default function DataDecryptPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const passCollectionContext = useContext(PassCollectionContext);
  const passwordInput = useInputText();

  const passwordInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!id || !uuid.check(id)) {
      navigate(PATH_ERROR[404]);
      return;
    }

    getById();
  }, []);

  useEffect(() => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
    }
  }, [passwordInputRef]);

  const getById = async () => {
    if (!id || !passCollectionContext) return;

    const res = await passCollectionService.getById({ id });
    if (!res) return;

    passCollectionContext.setCollectionInDb(res);
  };

  const decryptCollection = async () => {
    if (!id || !passCollectionContext || !passCollectionContext.collectionInDb) return;

    const res = cryptoV1.decrypt({ key: passwordInput.value, str: passCollectionContext.collectionInDb.encryptData });
    if (!res) return;

    const decryptData = JSON.parse(res) as IDecryptData;
    passCollectionContext.setDecryptCollectionData(decryptData);
    passCollectionContext.setPassword(passwordInput.value);

    navigate(`${PATH_PASS_COLLECTION_DECRYPT.VIEW}/${id}`);
  };

  const submit = async () => {
    if (id) await decryptCollection();
  };

  return (
    <>
      <Form
        title="Decrypt"
        smallTitle="Decrypt password collection"
        submitName="Decrypt"
        onSubmit={submit}
        backName="To list"
        onBack={() => navigate(PATH_PASS_COLLECTION.LIST)}
      >
        <InputText inputRef={passwordInputRef} title="Password" name="password" inputHook={passwordInput} />
      </Form>
    </>
  );
}
