import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH_HOME } from '../routes/paths';

interface IErrorComponent {
  title: string;
  description: string;
  code: string;
}

export default function ErrorComponent({ title, description, code }: IErrorComponent) {
  const navigate = useNavigate();

  return (
    <>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
      <div className="codeError">{code}</div>
      <div className="toHome">
        <button onClick={() => navigate(PATH_HOME.HOME)}>Go to home</button>
      </div>
    </>
  );
}
