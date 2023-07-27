import React from 'react';
import './RecordBlock.scss';

// ----------------------------------------------------------------------

interface IProps {
  name: string | React.ReactNode;
  content: React.ReactNode;
  buttons: React.ReactNode;
}

// ----------------------------------------------------------------------

export default function RecordBlock({ name, content, buttons }: IProps) {
  return (
    <div className="RecordBlock">
      <div className="title">{name}</div>
      <div className="data">
        {content}
        <div className="buttonBlock">{buttons}</div>
      </div>
    </div>
  );
}
