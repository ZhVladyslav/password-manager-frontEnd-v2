import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';
import { IRegistrationReq } from '../../types/authType';

// ----------------------------------------------------------------------

export default function RegistrationPage() {
  const [formData, setFormData] = useState<IRegistrationReq>({
    name: '',
    login: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation or other checks here
    const dataRegistration = await authService.registration(formData);
    if (dataRegistration.err) return;
    const dataLogin = await authService.login({ login: formData.login, password: formData.password });
    if (dataLogin.err) return;
    sessionActions.login(dataLogin.res.accessToken, dataLogin.res.refreshToken);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          login:
          <input type="login" name="login" value={formData.login} onChange={handleChange} />
        </label>
        <br />
        <label>
          password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>

      <Link to={PATH_AUTH.login}>login</Link>
    </>
  );
}
