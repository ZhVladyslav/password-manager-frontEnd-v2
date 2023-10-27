import React from 'react';
import { authService } from '../../services/auth.service';
import { userSession } from '../../auth/userSession';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { InputText, Form } from '../../components';
import { useInputText } from '../../hooks/useInputText.hook';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginInput = useInputText(/* { reg: /[0-9]/, errorText: 'test' } */);
  const passwordInput = useInputText();

  const submit = async () => {
    const loginRes = await authService.login({ login: loginInput.value, password: passwordInput.value });
    if (!loginRes) return;
    if ('token' in loginRes) userSession.create(loginRes.token);
  };

  return (
    <>
      <Form
        title="Welcome"
        smallTitle="Login in your account"
        submitName="Login"
        onSubmit={submit}
        backName="Registration"
        onBack={() => navigate(PATH_AUTH.REGISTRATION)}
      >
        <InputText title="Login" name="login" inputHook={loginInput} />
        <InputText title="Password" name="password" inputHook={passwordInput} />
      </Form>
    </>
  );
}
