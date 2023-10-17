import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { userSession } from '../../auth/userSession';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Form from '../../components/Form_1.component';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const nameInput = useInputText();
  const loginInput = useInputText();
  const passwordInput = useInputText();

  const submit = async () => {
    const registrationRes = await authService.registration({
      name: nameInput.value,
      login: loginInput.value,
      password: passwordInput.value,
    });
    if (!registrationRes) return;
    const loginRes = await authService.login({ login: loginInput.value, password: passwordInput.value });
    if (!loginRes) return;
    if ('token' in loginRes) userSession.create(loginRes.token);
  };

  return (
    <>
      <Form
        title="Registration"
        smallTitle="Create your account"
        submitName="Registration"
        onSubmit={submit}
        backName="Login"
        onBack={() => navigate(PATH_AUTH.LOGIN)}
      >
        <InputText title="Name" name="name" inputHook={nameInput} />
        <InputText title="Login" name="login" inputHook={loginInput} />
        <InputText title="Password" name="password" inputHook={passwordInput} />
      </Form>
    </>
  );
}
