import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormLogin, InputText, useFormLogin, useInputText } from '../../componentsNew';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function LoginPage() {
  const inputName = useInputText({ reg: /^[A-Za-z0-9 -]*$/, errorText: 'Invalid login' });
  const inputPassword = useInputText({ reg: /^[A-Za-z0-9 -]*$/, errorText: 'Invalid password' });
  const formLogin = useFormLogin({ inputs: [inputName.valid] });

  useEffect(() => {
    inputName.setValue('Demo user');
    inputPassword.setValue('P@ssword1234');
  }, []);

  const handleSubmit = async () => {
    // Perform form validation or other checks here
    const data = await authService.login({ login: inputName.value, password: inputPassword.value });
    if (data.err) return;
    sessionActions.login(data.res.accessToken, data.res.refreshToken);
  };

  return (
    <FormLogin
      title="Login in Password manager"
      alone
      onSubmit={handleSubmit}
      formValid={formLogin.valid}
      errorText={formLogin.errorText}
    >
      <InputText
        title={'Login'}
        error={inputName.error}
        onBlur={inputName.onBlur}
        onChange={inputName.onChange}
        value={inputName.value}
      />
      <InputText
        title={'Password'}
        error={inputPassword.error}
        onBlur={inputPassword.onBlur}
        onChange={inputPassword.onChange}
        value={inputPassword.value}
      />
      <div className="AuthForm-Link">
        <Link to={PATH_AUTH.registration}>registration</Link>
      </div>
    </FormLogin>
  );
}
