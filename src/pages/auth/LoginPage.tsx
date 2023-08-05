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
  const loginInput = useInputText({ reg: /^[0-9A-Za-z ]*$/, errorText: 'Invalid login' });
  const passwordInput = useInputText({ reg: /^[0-9A-Za-z @]*$/, errorText: 'Invalid password' });
  const form = useForm({ inputs: [loginInput.valid, passwordInput.valid] });

  const submit = async () => {
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
      <FormDefault
        to={PATH_AUTH.registration}
        toText="Registration"
        form={form}
        onSubmit={submit}
        title="Sing in password manager"
        buttons={<ButtonDefault title="Sing in" style="bg White" foolSize />}
      >
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
