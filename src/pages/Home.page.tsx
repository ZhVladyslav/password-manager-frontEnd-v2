import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_USER, PATH_ROLE } from '../routes/paths';
import { userActions } from '../redux/actions/userActions';
import { sessionActions } from '../redux/actions/sessionActions';
import { userSession } from '../auth/userSession';
import { sessionService } from '../services/session.service';

export default function HomePage() {
  const navigate = useNavigate();

  // const sessionStore = useSelector((state: IStore) => state);
  // console.log(sessionStore);

  const logout = async () => {
    await sessionService.logout();
    userActions.logout();
    sessionActions.close();
    userSession.close();
  };

  return (
    <>
      <button onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}>passCollection list</button> <br />
      <button onClick={() => navigate(PATH_USER.SETTINGS)}>user</button> <br />
      <button onClick={() => navigate(PATH_ROLE.LIST)}>Roles</button> <br />
      <button onClick={logout}>logout</button> <br />
    </>
  );
}
