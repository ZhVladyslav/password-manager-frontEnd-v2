import React from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { PATH_HOME } from '../../routes/paths';

const text = {
  403: {
    title: 'No permission',
    description: 'The page you`re trying access has restricted access. Please refer to your system administrator',
  },
  404: {
    title: 'Sorry, Page Not Found!',
    description:
      'Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your spelling.',
  },
  500: {
    title: '500 Internal Server Error',
    description: 'There was an error, please try again later.',
  },
};

export default function Error403Page() {
  const { code } = useParams();
  const navigate = useNavigate();

  if (!code) return <Navigate to={PATH_HOME.HOME} />;
  const codeString = code as '403' | '404' | '500';

  return (
    <>
      <div className="title">{text[codeString].title}</div>
      <div className="description">{text[codeString].description}</div>
      <div className="codeError">{codeString}</div>
      <div className="toHome">
        <button onClick={() => navigate(PATH_HOME.HOME)}>Go to home</button>
      </div>
    </>
  );
}
