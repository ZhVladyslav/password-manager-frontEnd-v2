import React, { useEffect, useState } from 'react';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/store.type';
import { userService } from '../../services/user.service';
import { userActions } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../routes/paths';
import { sessionActions } from '../../redux/actions/sessionActions';
import { userSession } from '../../auth/userSession';
import style from './settings.page.module.scss';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Button from '../../components/Button.component';

export default function UserSettingsPage() {
  const navigate = useNavigate();
  const store = useSelector((state: IStore) => state.user);

  const inputName = useInputText();
  const inputOldPassword = useInputText();
  const inputNewPassword = useInputText();
  const inputPasswordToDelete = useInputText();

  const updateName = async () => {
    if (inputName.value === '') return;
    const editUserName = await userService.editName({ name: inputName.value });
    if (!editUserName) return;
    userActions.editName(inputName.value);
  };

  const updatePassword = async () => {
    if (inputOldPassword.value === '' || inputNewPassword.value === '') return;
    if (inputOldPassword.value !== inputNewPassword.value) return;
    const editUserPassword = await userService.editPassword({
      password: inputOldPassword.value,
      newPassword: inputNewPassword.value,
    });
    if (!editUserPassword) return;
    userActions.logout();
    sessionActions.close();
    userSession.close();
  };

  const deleteUser = async () => {
    if (inputPasswordToDelete.value === '') return;
    await userService.delete({ password: inputPasswordToDelete.value });
  };

  const update = () => {
    updateName();
    updatePassword();
  };

  return (
    <>
      <h2 className={style.name}>User name: {store.name}</h2>

      <div className={style.blockContainer}>
        <h3>Edit user name</h3>
        <div className={style.inputContainer}>
          <InputText title="Edit name" name="name" inputHook={inputName} />
        </div>
      </div>

      <div className={style.blockContainer}>
        <h3>Edit user password</h3>
        <div className={style.inputContainer}>
          <InputText title="Old password" name="old_password" inputHook={inputOldPassword} />
          <InputText title="New password" name="new_password" inputHook={inputNewPassword} />
        </div>
      </div>

      <div className={style.blockContainer}>
        <h3>Password to confirm delete user account</h3>
        <div className={style.inputContainer}>
          <InputText title="Password" name="passwordToDelete" inputHook={inputPasswordToDelete} />
        </div>
      </div>

      <div className={style.buttonContainer}>
        <Button title="Update" onClick={update} />
        <Button title="Delete account" onClick={deleteUser} />
        <Button title="Close" onClick={() => navigate(PATH_HOME.HOME)} />
      </div>
    </>
  );
}
