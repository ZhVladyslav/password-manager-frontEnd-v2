import React from 'react';

import './Header.scss';
// ----------------------------------------------------------------------

interface IProps {
  name: string;
  onClick: () => void;
  status: boolean;
}

// ----------------------------------------------------------------------

export default function Header({ name, onClick, status }: IProps) {
  return (
    <div className="HeaderCollectionBlock">
      <span>{name}</span>
      <div className="buttonBlock">
        <div className="button" onClick={onClick}>
          {!status ? '+' : '-'}
        </div>
      </div>
    </div>
  );
}
