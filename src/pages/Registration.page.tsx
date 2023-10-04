import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../routes/paths';
import { userSession } from '../auth/userSession';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>('');
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const registrationRes = await authService.registration({ name, login, password });
    if (!registrationRes) return;
    const loginRes = await authService.login({ login, password });
    if ('token' in loginRes) userSession.create(loginRes.token);
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

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={inputNameChange} value={name} />
        <input type="text" onChange={inputLoginChange} value={login} />
        <input type="text" onChange={inputPasswordChange} value={password} />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => navigate(PATH_AUTH.LOGIN)}>To login</button>
    </>
  );
}
