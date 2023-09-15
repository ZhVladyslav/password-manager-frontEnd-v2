import React from 'react';
import { authService } from '../services/auth.service';

export default function LoginPage() {
  const submit = async () => {
    const test = await authService.login({ login: '', password: '' });
  };

  return (
    <div className="Auth-Container">
      <button onClick={submit}>submit</button>
    </div>
  );
}
