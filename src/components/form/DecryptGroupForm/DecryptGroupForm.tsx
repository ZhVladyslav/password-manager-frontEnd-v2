import React, { useState } from 'react';
import { SvgHiddenPassword, SvgViewPassword } from '../../../assets';
import { ButtonSvg } from '../../buttons';
import './DecryptGroupForm.scss';

// ----------------------------------------------------------------------

const enum EnumTypes {
  text = 'text',
  password = 'password',
}

interface IProps {
  value: string;
  title: string;
  label: string;
  name: string;
  buttonText: string;
  errorForm: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

// ----------------------------------------------------------------------

export default function DecryptGroupForm({
  value,
  title,
  label,
  buttonText,
  name,
  errorForm,
  onChange,
  onSubmit,
}: IProps) {
  const [inputType, setInputType] = useState<EnumTypes>(EnumTypes.password);

  const toggleInputType = () => {
    if (inputType === EnumTypes.text) setInputType(EnumTypes.password);
    else setInputType(EnumTypes.text);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <>
      <form onSubmit={submit} className="DecryptGroupForm">
        <h2 className="title">{title}</h2>
        <div className="inputBlocks">
          <label>{label}</label>
          <div className="inputBlock">
            <input autoComplete="off" type={inputType} name={name} onChange={onChange} value={value} />
            <div className="buttonBlock">
              <ButtonSvg
                svg={inputType === EnumTypes.text ? <SvgViewPassword /> : <SvgHiddenPassword />}
                onClick={toggleInputType}
              />
            </div>
          </div>
        </div>
        <button type="submit" className="submitButton">
          {buttonText}
        </button>

        {errorForm !== '' && <div className="error">{errorForm}</div>}
      </form>
    </>
  );
}
