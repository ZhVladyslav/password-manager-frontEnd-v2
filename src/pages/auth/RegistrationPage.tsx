import React from 'react';
import { Link } from 'react-router-dom';
import { jwtAuth } from '../../auth/jwtAuth';
import { ButtonDefault, InputText, useInputText } from '../../components';
import { useForm } from '../../hooks/useForm';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function LoginPage() {
  const nameInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid name' });
  const loginInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid login' });
  const passwordInput = useInputText({ reg: /^[0-9A-Za-z @]*$/, errorText: 'Invalid password' });
  const form = useForm({ inputs: [nameInput.valid, loginInput.valid, passwordInput.valid] });

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.valid) {
      try {
        const result = await authService.login({ login: loginInput.value, password: passwordInput.value });
        if (result.err) throw result.err;
        jwtAuth.login(result.res.accessToken, result.res.refreshToken);
        form.setErrorText(null);
      } catch (err) {
        form.setErrorText('Error data');
      }
    }
  };

  return (
    <div className="Auth-Container">
      <form onSubmit={submit}>
        <span className="title">Registration in password manager</span>
        <div className="inputBlock">
          <InputText
            title="Name"
            error={nameInput.error}
            onBlur={nameInput.onBlur}
            onChange={nameInput.onChange}
            value={nameInput.value}
          />
          <InputText
            title="Login"
            error={loginInput.error}
            onBlur={loginInput.onBlur}
            onChange={loginInput.onChange}
            value={loginInput.value}
          />
          <InputText
            title="Password"
            error={passwordInput.error}
            onBlur={passwordInput.onBlur}
            onChange={passwordInput.onChange}
            value={passwordInput.value}
          />
        </div>
        <div className="link">
          <Link to={PATH_AUTH.login}>Sing in</Link>
        </div>
        <div className="buttonBlock">
          <ButtonDefault title="Registration" style="bg White" foolSize />
        </div>
        {form.errorText && <span className="error">{form.errorText}</span>}
      </form>
    </div>
  );
}
