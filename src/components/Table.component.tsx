import React from 'react';
import style from './table.component.module.scss';

interface ITable {
  head: string[];
  children: React.ReactNode;
}

export default function Table({ head, children }: ITable) {
  return (
    <div className={style.tableContainer}>
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
