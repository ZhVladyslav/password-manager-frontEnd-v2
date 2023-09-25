import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Navigate } from 'react-router-dom';
import { PATH_AUTH, PATH_HOME } from '../routes/paths';
import { userSession } from '../auth/userSession';

export default function LoginPage() {
  const [toRegistration, setToRegistration] = useState<boolean>(false);
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const loginRes = await authService.login({ login, password });
      if ('token' in loginRes) userSession.create(loginRes.token);
    } catch (error) {
      console.log(error);
    }
  };

  const inputLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (toRegistration) return <Navigate to={PATH_AUTH.REGISTRATION} />;

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={inputLoginChange} value={login} />
        <input type="text" onChange={inputPasswordChange} value={password} />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => setToRegistration(true)}>To registration</button>
    </>
  );
}
