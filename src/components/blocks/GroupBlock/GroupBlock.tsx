import React from 'react';
import './GroupBlock.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string | React.ReactNode;
  onClick?: () => void;
  buttons?: React.ReactNode;
  [key: string]: unknown;
}

// ----------------------------------------------------------------------

export default function GroupBlock({ title, buttons, onClick, ...rest }: IProps) {
  return (
    <div className="GroupBlock" {...rest}>
      <div className="inner-GroupBlock">
        <div className="data" onClick={onClick}>
          {title}
        </div>

        {buttons && <div className="buttonBlock">{buttons}</div>}
      </div>
    </div>
  );
}
