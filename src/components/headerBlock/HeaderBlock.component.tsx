import React from 'react';
import styles from './headerBlock.component.module.scss';

interface IProps {
  children: React.ReactNode;
  leftSpace?: React.ReactNode;
}

export default function HeaderBlock({ children, leftSpace }: IProps) {
  return (
    <div className={styles.contentContainer}>
      <div >{leftSpace}</div>{' '}
      <div className={styles.buttonContainer}>{children}</div>
    </div>
  );
}
