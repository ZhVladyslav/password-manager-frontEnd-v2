import React from 'react';

import './Header2.scss';
// ----------------------------------------------------------------------

interface IProps {
  title: React.ReactNode;
  buttons: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function Header2({ title, buttons }: IProps) {
  return (
    <div className="Header2">
      <div className="inner-Header2">
        <div className="title">{title}</div>
        <div className="buttonBlock">{buttons}</div>
      </div>
    </div>
  );
}
