import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { Navigate } from 'react-router-dom';
import { PATH_AUTH } from '../routes/paths';
import { userSession } from '../auth/userSession';

export default function RegistrationPage() {
  const [toLogin, setToLogin] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await authService.registration({ name, login, password });
      const loginRes = await authService.login({ login, password });
      if ('token' in loginRes) userSession.create(loginRes.token);
    } catch (error) {
      console.log(error);
    }
  };

  const inputNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const inputLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  if (toLogin) return <Navigate to={PATH_AUTH.LOGIN} />;

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={inputNameChange} value={name} />
        <input type="text" onChange={inputLoginChange} value={login} />
        <input type="text" onChange={inputPasswordChange} value={password} />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => setToLogin(true)}>To login</button>
    </>
  );
}
