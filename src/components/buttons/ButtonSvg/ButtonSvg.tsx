import React from 'react';
import './ButtonSvg.scss';

// ----------------------------------------------------------------------

interface IProps {
  svg: React.ReactNode;
  bigSvg?: boolean;
  id?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => unknown;
  [key: symbol]: (e: React.MouseEvent<HTMLDivElement>) => void | (() => void);
}

// ----------------------------------------------------------------------

export default function ButtonSvg({ svg, bigSvg, id, onClick, ...rest }: IProps) {
  return (
    <div className="ButtonSvg" onClick={onClick} {...rest}>
      <span id={id} className={bigSvg ? 'bigSvg' : 'defSvg'}>
        {svg}
      </span>
    </div>
  );
}
