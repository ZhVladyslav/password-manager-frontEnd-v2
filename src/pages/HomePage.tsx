import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { sessionActions } from '../redux/slices/sessionSlice';
import { PATH_COLLECTION } from '../routes/paths';
import { authService } from '../services/authServices';
import { sessionService } from '../services/sessionServices';
import { IGetActiveSessionsRes } from '../types/sessionType';
import { formatDate } from '../utils/formatDate';

// ----------------------------------------------------------------------

export default function Main() {
  const [sessionList, setSessionList] = useState<IGetActiveSessionsRes[]>();

  const logout = async () => {
    await authService.logout();
    sessionActions.logout();
  };

  const getSessions = async () => {
    const data = await sessionService.getActives();
    if (data.err) return;
    setSessionList(data.res);
  };

  return (
    <>
      <h1>Auth</h1>
      <button onClick={logout}>logout</button>
      <hr />
      <h1>Collection</h1>
      <Link to={PATH_COLLECTION.list}>list</Link> <br />
      <Link to={PATH_COLLECTION.create}>create</Link> <br />
      <h1>Session</h1>
      <button onClick={getSessions}>getSessions</button>
      <hr />
      {sessionList?.map((item) => (
        <div key={item.id}>
          <span>
            <b>{`id: `}</b>
            {`${item.id}`}
          </span>
          <br />
          <span>
            <b>{`ip: `}</b>
            {`${item.ipV4}`}
          </span>
          <br />
          <span>
            <b>{`isActive: `}</b>
            {`${item.isActive}`}
          </span>
          <br />
          <span>
            <b>{`headerUserAgent: `}</b>
            {`${item.headerUserAgent}`}
          </span>
          <br />
          <span>
            <b>{`createDate: `}</b>
            {`${formatDate(item.createDate)}`}
          </span>
          <br />
          <span>
            <b>{`expDate: `}</b>
            {`${formatDate(item.expDate)}`}
          </span>
          <br />
          <br />
          <br />
        </div>
      ))}
    </>
  );
}
