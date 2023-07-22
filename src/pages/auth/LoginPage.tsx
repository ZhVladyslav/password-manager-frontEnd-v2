import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/Form';
import Input, { EnumTypes } from '../../components/Input';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';
import { ILoginReq } from '../../types/authType';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function LoginPage() {
  const [formData, setFormData] = useState<ILoginReq>({
    login: 'Demo user',
    password: 'P@ssword1234',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Perform form validation or other checks here
    const data = await authService.login(formData);
    if (data.err) return;
    sessionActions.login(data.res.accessToken, data.res.refreshToken);
  };

  return (
    <div className="authContainer">
      <Form submit={handleSubmit} buttonName="Login">
        <Input type={EnumTypes.text} name={'login'} onChange={handleChange} value={formData.login} label={'Login'} />
        <Input
          type={EnumTypes.password}
          name={'password'}
          onChange={handleChange}
          value={formData.password}
          label={'Password'}
        />

        <Link to={PATH_AUTH.registration}>registration</Link>
      </Form>
    </div>
  );
}
