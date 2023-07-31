import React from 'react';
import ButtonDefault from '../../buttons/ButtonDefault/ButtonDefault';
import './FormDefault.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  formValid: boolean;
  alone?: boolean;
  submitButtonName?: string;
  children: React.ReactNode;
  errorText?: string | null;
  onlyButtonClose?: boolean;
  onSubmit: () => void;
  onClose: () => void;
}

// ----------------------------------------------------------------------

const FormDefault: React.FC<IProps> = ({
  title,
  formValid,
  errorText,
  alone,
  children,
  onSubmit,
  submitButtonName,
  onlyButtonClose,
  onClose,
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formValid) {
      onSubmit();
    }
  };

  const formClick = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="FormDefault-Container" onClick={onlyButtonClose ? undefined : onClose}>
      <form onSubmit={submit} className={`FormDefault ${alone ? 'aloneInput' : ''}`} onClick={formClick}>
        <h2 className="title">{title}</h2>
        <div className="inputBlock">{children}</div>
        <div className="buttonBlock">
          <ButtonDefault title="Cancel" style="border" type="button" onClick={onClose} />
          <ButtonDefault title={submitButtonName ? submitButtonName : 'Submit'} type="submit" style="bg White" />
        </div>
        {errorText && <div className="errorText">{errorText}</div>}
      </form>
    </div>
  );
};

// ----------------------------------------------------------------------

export default FormDefault;
