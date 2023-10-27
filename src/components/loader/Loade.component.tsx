import React from 'react';
import styles from './loader.component.module.scss';

export default function Loader() {
  return (
    <div className={styles['LoaderDefault-Container']}>
      <div className={styles.LoaderDefault}>
        <span className={styles.loader}>
          <span className={styles.firstLine} />
          <span className={styles.secondLine} />
        </span>
      </div>
    </div>
  );
}
