import React from 'react';
import style from './form_1.component.module.scss';
import Button from './Button.component';

interface IForm {
  children: React.ReactNode;
  onSubmit: () => void;
  onBack: () => void;
  backName: string;
  submitName: string;
  title: string;
  smallTitle: string;
}

export default function Form({ children, onSubmit, onBack, backName, submitName, title, smallTitle }: IForm) {
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className={style.container}>
      <div className={style.content_container}>
        <div className={style.content_block}>
          <div className={style.textBlock}>
            <h1>{title}</h1>
            <h2>{smallTitle}</h2>
          </div>
          <form onSubmit={submit}>
            <div className={style.inputBlock}>{children}</div>
            <div className={style.formButton}>
              <Button type="submit" title={submitName} />
            </div>
            <div className={style.linkButton}>
              <span onClick={onBack}>{backName}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
