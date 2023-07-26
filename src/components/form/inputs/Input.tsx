import React from 'react';

import './Input.scss';

// ----------------------------------------------------------------------

export const enum EnumTypes {
  text = 'text',
  password = 'password',
}

interface IProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: IInputValue | string;
  name: string;
  label: string;
  type: EnumTypes;
}

export interface IInputValue {
  value: string;
  valid: boolean;
  error: boolean;
  focus: boolean;
  blur: boolean;
}

// ----------------------------------------------------------------------

export default function Input({ onChange, value, name, type, label }: IProps) {
  return (
    <div className="inputContainer">
      <label>{label}</label>

      {typeof value === 'string' ? (
        <input autoComplete="off" type={type} name={name} onChange={onChange} value={value} />
      ) : (
        <input type={type} name={name} onChange={onChange} value={value.value} />
      )}
    </div>
  );
}
