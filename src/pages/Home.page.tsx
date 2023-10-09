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
      This project create to demonstration my skills in web technologies
    </>
  );
}
