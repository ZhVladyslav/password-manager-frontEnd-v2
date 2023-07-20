import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { sessionActions } from '../../redux/slices/sessionSlice';
import { PATH_AUTH } from '../../routes/paths';
import { authService } from '../../services/authServices';
import { ILoginReq } from '../../types/authType';

// ----------------------------------------------------------------------

export default function LoginPage() {
  const [formData, setFormData] = useState<ILoginReq>({
    login: 'UserLogin',
    password: 'P@ssword1234',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Perform form validation or other checks here
    const data = await authService.login(formData);
    if (data.err) return;
    sessionActions.login(data.res.accessToken, data.res.refreshToken);
  };

  return (
    <>
      <code>login:UserLogin</code> <br />
      <code>password:P@ssword1234</code> <br />
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          login:
          <input type="text" name="login" value={formData.login} onChange={handleChange} />
        </label>
        <br />
        <label>
          password:
          <input type="text" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      <hr />
      <Link to={PATH_AUTH.registration}>registration</Link>
    </>
  );
}
