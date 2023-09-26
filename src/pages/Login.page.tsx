import React, { useState } from 'react';
import { authService } from '../services/auth.service';
import { PATH_AUTH } from '../routes/paths';
import { userSession } from '../auth/userSession';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();

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

  return (
    <>
      <form onSubmit={submit}>
        <input type="text" onChange={inputLoginChange} value={login} />
        <input type="text" onChange={inputPasswordChange} value={password} />
        <button type="submit">submit</button>
      </form>
      <button onClick={() => navigate(PATH_AUTH.REGISTRATION)}>To registration</button>
    </>
  );
}
