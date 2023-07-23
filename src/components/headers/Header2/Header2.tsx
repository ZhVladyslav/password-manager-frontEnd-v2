import React from 'react';

import './Header2.scss';
// ----------------------------------------------------------------------

interface IProps {
  name: string;
  buttons: React.ReactNode[];
}

// ----------------------------------------------------------------------

export default function Header2({ name, buttons }: IProps) {
  return (
    <div className="header2">
      <div className="inner-header2">
        <div className="logo">
          <span className='logo-span'>{name}</span>
        </div>
        <div className="buttonBlock">
          {buttons.map((item, i) => (
            <span key={i} className='buttonBlock-span'>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
