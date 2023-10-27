import React from 'react';
import styles from './block.component.module.scss';

interface IProps {
  w?: string;
  h?: string;
  direction?: 'column' | 'row';
  p?: string;
  m?: string;
  children?: React.ReactNode;
  contentX?: 'center' | 'flex-end' | 'flex-start';
  contentY?: 'center' | 'flex-end' | 'flex-start';
}

export default function Block({ w, h, direction = 'row', p = '0px', m = '0px', contentX, contentY, children }: IProps) {
  return (
    <div
      className={styles.block}
      style={{
        width: w,
        height: h,
        padding: p,
        margin: m,
        flexDirection: direction,
        justifyContent: contentX,
        alignItems: contentY,
      }}
    >
      {children}
    </div>
  );
}
