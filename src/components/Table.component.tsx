import React from 'react';
import style from './table.component.module.scss';

interface ITable {
  head: string[];
  children: React.ReactNode;
  size?: {
    width: string;
    height: string;
  };
}

export default function Table({ head, children, size = { width: '100vw', height: '100vh' } }: ITable) {
  return (
    <div className={style.tableContainer} style={{ width: size.width, height: size.height }}>
      <table>
        {/* HEAD */}
        <thead>
          <tr>
            {head.map((title, i) => (
              <th key={i}>{title}</th>
            ))}
          </tr>
        </thead>
        {/* BODY */}
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
