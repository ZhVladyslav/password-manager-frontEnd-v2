import React from 'react';
import { ButtonDefault } from '../../components';
import './FormPopup.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  submitTitle: string;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  form: {
    valid: boolean;
    errorText: string | null;
  };
}

// ----------------------------------------------------------------------

const FormPopup: React.FC<IProps> = ({ onClose, onSubmit, children, form, title, submitTitle }) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.valid) return;
    onSubmit();
  };

  return (
    <div className="FormPopup-Container" onClick={onClose}>
      <div className="formBlock" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={submit}>
          <span className="title">{title}</span>
          <div className="inputBlock">{children}</div>
          <div className="buttonBlock">
            <ButtonDefault title="Cancel" style="border" onClick={onClose} type="button" />
            <ButtonDefault title={submitTitle} style="bg White" type="submit" />
          </div>
          {form.errorText && <span className="error">{form.errorText}</span>}
        </form>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default FormPopup;
