import React from 'react';
import styles from './button.component.module.scss';

interface IProps {
  onClick?: () => void;
  type?: 'submit' | 'button' | 'reset';
  title: string;
}

export default function Button({ title, onClick, type }: IProps) {
  return (
    <button className={styles.container} onClick={onClick} type={type}>
      {title}
    </button>
  );
}
