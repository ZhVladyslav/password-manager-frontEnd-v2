import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH_DATA, PATH_USER } from '../routes/paths';

export default function HomePage() {
  const navigate = useNavigate();

  // const sessionStore = useSelector((state: IStore) => state);
  // console.log(sessionStore);

  return (
    <>
      <button onClick={() => navigate(PATH_DATA.LIST)}>passCollection list</button> <br />
      <button onClick={() => navigate(PATH_USER.VIEW)}>user</button> <br />
      {/* <button onClick={() => navigate(PATH_DATA.LIST)}>Roles</button> <br /> */}
    </>
  );
}
