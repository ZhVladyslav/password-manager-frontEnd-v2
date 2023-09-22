import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { PATH_HOME } from '../routes/paths';

interface IErrorComponent {
  title: string;
  description: string;
  code: string;
}

export default function ErrorComponent({ title, description, code }: IErrorComponent) {
  const [toHome, setToHome] = useState<boolean>(false);

  if (toHome) {
    return <Navigate to={PATH_HOME.HOME} replace />;
  }

  const toHomeFunc = () => {
    setToHome(true);
  };

  return (
    <>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="codeError">{code}</div>
      <div className="toHome">
        <button onClick={toHomeFunc}>Go to home</button>
      </div>
    </>
  );
}
