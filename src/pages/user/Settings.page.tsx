import React, { useEffect, useState } from 'react';
import { useSelector } from '../../redux/store';
import { IStore } from '../../types/store.type';
import { userService } from '../../services/user.service';
import { userActions } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../../routes/paths';
import { sessionActions } from '../../redux/actions/sessionActions';
import { userSession } from '../../auth/userSession';

export default function UserSettingsPage() {
  const navigate = useNavigate();
  const store = useSelector((state: IStore) => state.user);

  const [newName, setNewName] = useState<string>('');
  const [oldPass, setOldPass] = useState<string>('');
  const [newPass, setNewPass] = useState<string>('');

  const [passwordToDelete, setPasswordToDelete] = useState<string>('');

  const updateName = async () => {
    if (newName === '') return;
    const editUserName = await userService.editName({ name: newName });
    if (!editUserName) return;
    userActions.editName(newName);
  };

  const updatePassword = async () => {
    if (oldPass === '' || newPass === '') return;
    const editUserPassword = await userService.editPassword({ password: oldPass, newPassword: newPass });
    if (!editUserPassword) return;
    userActions.logout();
    sessionActions.close();
    userSession.close();
  };

  const deleteUser = async () => {
    if (passwordToDelete === '') return;
    await userService.delete({ password: passwordToDelete });
  };

  return (
    <>
      <div>
        <span>User name: {store.name}</span>
      </div>

      <div>
        <span>Edit name</span>
        <input
          name="user_name"
          type="text"
          placeholder="name"
          onChange={(e) => setNewName(e.target.value)}
          value={newName}
        />
      </div>
      <div>
        <br />
        <button onClick={updateName}>Edit name</button>
        <br />
        <br />
      </div>

      <div>
        <span>Edit password old</span>
        <input
          name="user_password_old"
          type="text"
          placeholder="password old"
          onChange={(e) => setOldPass(e.target.value)}
          value={oldPass}
        />
      </div>

      <div>
        <span>Edit password new</span>
        <input
          name="user_password_new"
          type="text"
          placeholder="password new"
          onChange={(e) => setNewPass(e.target.value)}
          value={newPass}
        />
      </div>

      <div>
        <br />
        <span>Input password to delete account</span>
        <input
          name="delete_account"
          type="text"
          placeholder="password to delete"
          onChange={(e) => setPasswordToDelete(e.target.value)}
          value={passwordToDelete}
        />
      </div>

      <div>
        <br />
        <button onClick={updatePassword}>Edit pass</button>
        <button onClick={() => navigate(PATH_HOME.HOME)}>To home</button>
        <button onClick={deleteUser}>Delete account</button>
      </div>
    </>
  );
}
