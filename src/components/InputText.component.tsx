import React, { useState } from 'react';
import style from './inputText.component.module.scss';

interface IProps {
  inputHook: {
    value: string;
    errorText: string;
    errorStatus: boolean;
    onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: () => void;
  };
  title: string;
  name?: string;
}

export default function InputText({ title, name, inputHook }: IProps) {
  const { errorText, errorStatus, onBlur, onChange, value } = inputHook;
  const [focus, setFocus] = useState<boolean>(false);

  const setStyle = (): string => {
    const styles: string[] = [style.inputText_Container];

    if (!errorStatus) styles.push(style.inputText_Default);
    else styles.push(style.inputText_Error);
    if (value !== '') styles.push(style.inputText_Change);
    if (focus) styles.push(style.inputText_Focus);

    return styles.join(' ');
  };

  const onFocusFunc = () => {
    setFocus(true);
  };

  const onBlurFunc = () => {
    onBlur();
    setFocus(false);
  };

  return (
    <div className={setStyle()}>
      <label>{title}</label>
      <div className={style.inputContainer}>
        <input
          type="text"
          onFocus={onFocusFunc}
          onBlur={onBlurFunc}
          onChange={onChange}
          name={name}
          value={value}
          autoComplete="off"
        />
        <fieldset>
          <legend>
            <span>{title}</span>
          </legend>
        </fieldset>
      </div>

      {errorStatus && errorText !== '' && <div className={style.inputTextError}>{errorText}</div>}
    </div>
  );
}
