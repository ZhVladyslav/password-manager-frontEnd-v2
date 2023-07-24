import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/formContainers/Form';
import Input, { EnumTypes } from '../../components/form/inputs/Input';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';
import { IRegistrationReq } from '../../types/authType';

import './AuthStyle.scss';
// ----------------------------------------------------------------------

export default function RegistrationPage() {
  const [formData, setFormData] = useState<IRegistrationReq>({
    name: '',
    login: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Perform form validation or other checks here
    const dataRegistration = await authService.registration(formData);
    if (dataRegistration.err) return;
    const dataLogin = await authService.login({ login: formData.login, password: formData.password });
    if (dataLogin.err) return;
    sessionActions.login(dataLogin.res.accessToken, dataLogin.res.refreshToken);
  };

  return (
    <div className="authContainer">
      <Form submit={handleSubmit} buttonName="Registration">
        <Input type={EnumTypes.text} name={'name'} onChange={handleChange} value={formData.name} label={'Name'} />
        <Input type={EnumTypes.text} name={'login'} onChange={handleChange} value={formData.login} label={'Login'} />
        <Input
          type={EnumTypes.password}
          name={'password'}
          onChange={handleChange}
          value={formData.password}
          label={'Password'}
        />

        <Link to={PATH_AUTH.login}>Login</Link>
      </Form>
    </div>
  );
}
