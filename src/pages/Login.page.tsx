import React from 'react';
import { authService } from '../services/auth.service';
import { sessionActions } from '../redux/actions/sessionActions';
import { useSelector } from '../redux/store';
import { IStore } from '../types/store.type';

export default function LoginPage() {
  const accessToken = useSelector((state: IStore) => state.session.token);
  console.log(accessToken);

  const submit = async () => {
    // const test = await authService.login({ login: '', password: '' });
    sessionActions.login('asd');
  };

  return (
    <div className="Auth-Container">
      <button onClick={submit}>submit</button>
    </div>
  );
}
