import React, { useState } from 'react';
import style from './inputTextIndependent.component.module.scss';

interface IProps {
  onChange: (data: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  title: string;
  name?: string;
  size?: 'small' | 'middle' | 'big';
}

export default function InputTextIndependent({ title, name, value, onChange, size }: IProps) {
  const [focus, setFocus] = useState<boolean>(false);

  const setStyle = (): string => {
    const styles: string[] = [style.inputText_Container];

    styles.push(style.inputText_Default);

    if (value !== '') styles.push(style.inputText_Change);
    if (focus) styles.push(style.inputText_Focus);

    // size
    if (size === 'small') styles.push(style.inputText_size_small);
    else if (size === 'big') styles.push(style.inputText_size_big);
    else styles.push(style.inputText_size_middle);

    return styles.join(' ');
  };

  const onFocusFunc = () => {
    setFocus(true);
  };

  const onBlurFunc = () => {
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
    </div>
  );
}
