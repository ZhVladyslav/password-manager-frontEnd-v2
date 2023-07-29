import React from 'react';
import './FormDefault.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  formValid: boolean;
  children: React.ReactNode;
  onSubmit: () => void;
  onCloseForm: () => void
}

// ----------------------------------------------------------------------

const FormDefault: React.FC<IProps> = ({ title, formValid, children, onSubmit, onCloseForm }) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValid) {
      onSubmit();
    }
  };

  const formClick =(e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation()
  }

  return (
    <div className="FormDefault-Container" onClick={onCloseForm}>
      <form onSubmit={submit} className="FormDefault" onClick={formClick}>
        <h2 className="title">{title}</h2>
        <div className="inputBlock">{children}</div>
        <div className="buttonBlock"></div>
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------

export default FormDefault;
