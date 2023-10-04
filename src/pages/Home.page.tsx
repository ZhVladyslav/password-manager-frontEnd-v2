import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_PASS_COLLECTION, PATH_USER, PATH_ROLE } from '../routes/paths';

export default function HomePage() {
  const navigate = useNavigate();

  // const sessionStore = useSelector((state: IStore) => state);
  // console.log(sessionStore);

  return (
    <>
      <button onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}>passCollection list</button> <br />
      <button onClick={() => navigate(PATH_USER.SETTINGS)}>user</button> <br />
      <button onClick={() => navigate(PATH_ROLE.LIST)}>Roles</button> <br />
    </>
  );
}
