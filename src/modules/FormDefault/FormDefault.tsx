import React from 'react';
import { Link } from 'react-router-dom';
import './FormDefault.scss';

// ----------------------------------------------------------------------

type titlePositionType = 'left' | 'center' | 'right';

interface IProps {
  title: string;
  titlePosition?: titlePositionType;
  children: React.ReactNode;
  buttons: React.ReactNode;
  to?: string;
  toText?: string;
  form: {
    valid: boolean;
    errorText: string | null;
  };
  onSubmit: () => void;
}

// ----------------------------------------------------------------------

const FormDefault: React.FC<IProps> = ({
  children,
  to,
  titlePosition = 'center',
  toText,
  onSubmit,
  buttons,
  form,
  title,
}) => {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.valid) return;
    onSubmit();
  };

  return (
    <form onSubmit={submit} className="FormDefault-Container">
      <span
        className={`title 
        ${titlePosition === 'left' ? 'title-left' : ''} 
        ${titlePosition === 'center' ? 'title-center' : ''} 
        ${titlePosition === 'right' ? 'title-right' : ''}
        `}
      >
        {title}
      </span>
      <div className="inputBlock">{children}</div>
      {to && (
        <div className="link">
          <Link to={to}>{toText}</Link>
        </div>
      )}
      <div className="buttonBlock">{buttons}</div>
      {form.errorText && <span className="error">{form.errorText}</span>}
    </form>
  );
};

// ----------------------------------------------------------------------

export default FormDefault;
