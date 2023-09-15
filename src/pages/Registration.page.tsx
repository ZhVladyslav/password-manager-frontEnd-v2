import React from 'react';
import { authService } from '../services/auth.service';

export default function RegistrationPage() {
  const submit = async () => {
    const test = await authService.registration({ login: '', name: '', password: '' });
  };

  return (
    <div className="Auth-Container">
      <button onClick={submit}>submit</button>
    </div>
  );
}
