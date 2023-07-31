import React from 'react';
import './ButtonRound.scss';

// ----------------------------------------------------------------------

type buttonTypes = 'button' | 'submit' | 'reset' | undefined;

interface IProps {
  children: React.ReactNode;
  type?: buttonTypes;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// ----------------------------------------------------------------------

const ButtonRound: React.FC<IProps> = ({ children, type, onClick }) => {
  return (
    <button type={type} className="ButtonRound" onClick={onClick}>
      <span>{children}</span>
    </button>
  );
};

// ----------------------------------------------------------------------

export default ButtonRound;
