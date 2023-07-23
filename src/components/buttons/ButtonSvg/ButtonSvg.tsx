import React from 'react';
import './ButtonSvg.scss';

// ----------------------------------------------------------------------

interface IProps {
  svg: React.ReactNode;
  bigSvg?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void | (() => void);
  [key: symbol]: (e: React.MouseEvent<HTMLDivElement>) => void | (() => void);
}

// ----------------------------------------------------------------------

export default function ButtonSvg({ svg, bigSvg, onClick, ...rest }: IProps) {
  return (
    <div className="ButtonSvg" onClick={onClick} {...rest}>
      <span className={bigSvg ? 'bigSvg' : 'defSvg'}>{svg}</span>
    </div>
  );
}
