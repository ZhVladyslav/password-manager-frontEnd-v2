import React from 'react';
import './Form.scss';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  submit: () => void;
  buttonName?: string;
  errorValue?: string;
}

// ----------------------------------------------------------------------

export default function Form({ children, submit, buttonName = 'Submit', errorValue }: IProps) {
  const submitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <form autoComplete="off" className="inputForm" onSubmit={submitFunction}>
      {children}
      <button type="submit">{buttonName}</button>

      <div className="errorBlock">
        <span>{errorValue && errorValue !== '' && errorValue}</span>
      </div>
    </form>
  );
}
