import React from 'react';
import './Form.scss';

// ----------------------------------------------------------------------

interface IProps {
  children: React.ReactNode;
  submit: () => void;
  buttonName?: string;
}

// ----------------------------------------------------------------------

export default function Form({ children, submit, buttonName = 'Submit' }: IProps) {
  const submitFunction = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <form className="inputForm" onSubmit={submitFunction}>
      {children}
      <button type="submit">{buttonName}</button>
    </form>
  );
}
