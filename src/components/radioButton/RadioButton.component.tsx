import React from 'react';
import styles from './radioButton.component.module.scss';

interface IProps {
  svg: React.ReactNode;
  onClick?: () => void;
}

export default function RadioButton({ svg, onClick }: IProps) {
  return (
    <button className={styles.container}>
      <div className={styles.svgContainer}>{svg}</div>
    </button>
  );
}
