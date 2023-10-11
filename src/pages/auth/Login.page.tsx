import React, { useState } from 'react';
import { authService } from '../../services/auth.service';
import { userSession } from '../../auth/userSession';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import style from './login.page.module.scss';
import { PATH_AUTH } from '../../routes/paths';
import InputText from '../../components/InputText.component';
import { useInputText } from '../../hooks/useInputText.hook';
import Button from '../../components/Button.component';

export default function LoginPage() {
  const navigate = useNavigate();
  const loginInput = useInputText({ reg: /[0-9]/, errorText: 'test' });
  const passwordInput = useInputText();

  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginRes = await authService.login({ login, password });
    if (!loginRes) return;
    if ('token' in loginRes) userSession.create(loginRes.token);
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.inner_container}>
          <div className={style.content}>
            <h1>Welcome</h1>
            <h2>Log in in your account</h2>
            <form onSubmit={submit}>
              <InputText title="Login" name="login" inputHook={loginInput} />
              <InputText title="Password" name="password" inputHook={passwordInput} />
              <Button type="submit" title="submit" />
            </form>
            <Button onClick={() => navigate(PATH_AUTH.REGISTRATION)} title="To registration" />
          </div>
          <div className={style.img}>
            <img src={Logo} />
          </div>
        </div>
      </div>
    </>
  );
}
