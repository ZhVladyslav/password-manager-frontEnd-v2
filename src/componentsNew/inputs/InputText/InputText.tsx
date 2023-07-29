import React, { useState } from 'react';
import './InputText.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  value: string;
  error: string | null;
  onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

// ----------------------------------------------------------------------

const InputText: React.FC<IProps> = ({ title, value, onChange, error, onBlur }) => {
  const [inputFocus, setInputFocus] = useState<boolean>(false);

  const inputStyles = (): string => {
    let style = '';

    if (!error) style += ' InputText-Container-Default';
    if (error) style += ' InputText-Container-Error';
    if (value !== '') style += ' InputText-Container-Change';
    if (inputFocus) style += ' InputText-Container-Focus';

    return style;
  };

  return (
    <div className={`InputText-Container${inputStyles()}`}>
      <label>{title}</label>
      <div className="inputContainer">
        <input
          type="text"
          onChange={onChange}
          value={value}
          onFocus={() => setInputFocus(true)}
          onBlur={() => {
            onBlur();
            setInputFocus(false);
          }}
        />
        <fieldset>
          <legend>
            <span>{title}</span>
          </legend>
        </fieldset>
      </div>

      {error && <div className="inputTextError">{error}</div>}
    </div>
  );
};

// ----------------------------------------------------------------------

export default InputText;
