import React from 'react';
import { jwtAuth } from '../../auth/jwtAuth';
import { ButtonDefault, InputText, useInputText } from '../../components';
import { useForm } from '../../hooks/useForm';
import { FormDefault } from '../../modules';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function LoginPage() {
  const nameInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid name' });
  const loginInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid login' });
  const passwordInput = useInputText({});
  const form = useForm({ inputs: [nameInput.valid, loginInput.valid, passwordInput.valid] });

  const submit = async () => {
    if (form.valid) {
      try {
        const result = await authService.registration({
          name: nameInput.value,
          login: loginInput.value,
          password: passwordInput.value,
        });
        if (result.err) throw result.err;
        const resultLogin = await authService.login({ login: loginInput.value, password: passwordInput.value });
        if (resultLogin.err) throw resultLogin.err;
        jwtAuth.login(resultLogin.res.accessToken, resultLogin.res.refreshToken);
        form.setErrorText(null);
      } catch (err) {
        form.setErrorText('Error data');
      }
    }
  };

  return (
    <div className="Auth-Container">
      <FormDefault
        to={PATH_AUTH.login}
        toText="Sing in"
        form={form}
        onSubmit={submit}
        title="Registration in password manager"
        buttons={<ButtonDefault title="Registration" style="bg White" foolSize />}
      >
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
      </FormDefault>
    </div>
  );
}
