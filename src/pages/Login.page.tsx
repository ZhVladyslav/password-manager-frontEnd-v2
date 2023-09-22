import React, { useState } from 'react';
import { authService } from '../services/auth.service';

export default function LoginPage() {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    authService.login({ login, password });
  };

  const inputLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const inputPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={submit}>
      <input type="text" onChange={inputLoginChange} value={login} />
      <input type="text" onChange={inputPasswordChange} value={password} />
    </form>
  );
}
