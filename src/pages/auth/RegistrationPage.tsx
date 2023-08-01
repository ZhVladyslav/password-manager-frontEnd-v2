import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FormLogin, InputText, useFormLogin, useInputText } from '../../componentsNew';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function RegistrationPage() {
  const inputName = useInputText({ reg: /^[A-Za-z0-9 -]*$/, errorText: 'Invalid name' });
  const inputLogin = useInputText({ reg: /^[A-Za-z0-9 -]*$/, errorText: 'Invalid login' });
  const inputPassword = useInputText({ reg: /^[A-Za-z0-9 -]*$/, errorText: 'Invalid password' });
  const formLogin = useFormLogin({ inputs: [inputName.valid] });

  const handleSubmit = async () => {
    // Perform form validation or other checks here
    const dataRegistration = await authService.registration({
      login: inputLogin.value,
      name: inputName.value,
      password: inputPassword.value,
    });
    if (dataRegistration.err) return;
    const dataLogin = await authService.login({ login: inputLogin.value, password: inputPassword.value });
    if (dataLogin.err) return;
    sessionActions.login(dataLogin.res.accessToken, dataLogin.res.refreshToken);
  };

  return (
    <FormLogin
      title="Registration in Password manager"
      alone
      onSubmit={handleSubmit}
      formValid={formLogin.valid}
      errorText={formLogin.errorText}
    >
      <InputText
        title={'Name'}
        error={inputName.error}
        onBlur={inputName.onBlur}
        onChange={inputName.onChange}
        value={inputName.value}
      />
      <InputText
        title={'Login'}
        error={inputLogin.error}
        onBlur={inputLogin.onBlur}
        onChange={inputLogin.onChange}
        value={inputLogin.value}
      />
      <InputText
        title={'Password'}
        error={inputPassword.error}
        onBlur={inputPassword.onBlur}
        onChange={inputPassword.onChange}
        value={inputPassword.value}
      />
      <div className="AuthForm-Link">
        <Link to={PATH_AUTH.login}>Login</Link>
      </div>
    </FormLogin>
  );
}
