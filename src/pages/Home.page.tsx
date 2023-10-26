import React from 'react';
import Logo from '../assets/logo.png';
import style from './home.page.module.scss';

export default function HomePage() {
  return (
    <>
      <div className={style.container}>
        <div className={style.img}>
          <img src={Logo} />
        </div>
        <div className={style.text}>
          <span>{process.env.REACT_APP_DESCRIPTION}</span>
        </div>
      </div>
    </>
  );
}
