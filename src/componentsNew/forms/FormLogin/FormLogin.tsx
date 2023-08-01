import React from 'react';
import ButtonDefault from '../../buttons/ButtonDefault/ButtonDefault';
import './FormLogin.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  formValid: boolean;
  alone?: boolean;
  submitButtonName?: string;
  children: React.ReactNode;
  errorText?: string | null;
  onSubmit: () => void;
}

// ----------------------------------------------------------------------

const FormLogin: React.FC<IProps> = ({ title, formValid, errorText, alone, children, onSubmit, submitButtonName }) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValid) {
      onSubmit();
    }
  };

  return (
    <div className="FormLogin-Container">
      <form onSubmit={submit} className={`FormLogin ${alone ? 'aloneInput' : ''}`}>
        <h2 className="title">{title}</h2>
        <div className="inputBlock">{children}</div>
        <div className="buttonBlock">
          <ButtonDefault
            title={submitButtonName ? submitButtonName : 'Submit'}
            type="submit"
            style="bg White"
            foolSize
          />
        </div>
        {errorText && <div className="errorText">{errorText}</div>}
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------

export default FormLogin;
