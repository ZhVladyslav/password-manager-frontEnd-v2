import React from 'react';
import './GroupBlock.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string | React.ReactNode;
  onClick?: () => void;
  buttons?: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function GroupBlock({ title, buttons, onClick }: IProps) {
  return (
    <div className="GroupBlock">
      <div className="inner-GroupBlock">
        <div className="data" onClick={onClick}>
          {title}
        </div>

        {buttons && <div className="buttonBlock">{buttons}</div>}
      </div>
    </div>
  );
}
