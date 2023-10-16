import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../routes/paths';
import { userSession } from '../../auth/userSession';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import style from './login.page.module.scss';
import Button from '../../components/Button.component';
import Logo from '../../assets/logo.png';

export default function RegistrationPage() {
  const navigate = useNavigate();

  const nameInput = useInputText();
  const loginInput = useInputText();
  const passwordInput = useInputText();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      <div className={style.container}>
        <div className={style.content_container}>
          <div className={style.content_block}>
            <div className={style.textBlock}>
              <h1>Registration</h1>
              <h2>Create your account</h2>
            </div>
            <form onSubmit={submit}>
              <div className={style.inputBlock}>
                <InputText title="Name" name="name" inputHook={nameInput} />
                <InputText title="Login" name="login" inputHook={loginInput} />
                <InputText title="Password" name="password" inputHook={passwordInput} />
              </div>
              <div className={style.formButton}>
                <Button type="submit" title="Registration" />
              </div>
              <div className={style.linkButton}>
                <span onClick={() => navigate(PATH_AUTH.LOGIN)}>Login</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
