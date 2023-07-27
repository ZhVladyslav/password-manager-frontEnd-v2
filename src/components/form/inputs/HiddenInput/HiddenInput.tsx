import React from 'react';
import './HiddenInput.scss';

// ----------------------------------------------------------------------

interface IProps {
  value: string;
  name: string;
  type: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles?: {
    fontSize: string;
    color: string;
    [key: string]: string;
  };
}

// ----------------------------------------------------------------------

export default function HiddenInput({ onKeyDown, value, onChange, name, type, styles }: IProps) {
  return (
    <div className="HiddenInput">
      <input
        onKeyDown={onKeyDown}
        style={styles}
        autoComplete="off"
        type={type}
        name={name}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
