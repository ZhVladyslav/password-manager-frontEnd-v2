import React from 'react';
import './ButtonSidebar.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  onClick: () => void;
  isActive: boolean;
}

// ----------------------------------------------------------------------

const ButtonSidebar: React.FC<IProps> = ({ title, onClick, isActive }) => {
  const click = () => {
    if (isActive) return;
    onClick();
  };

  return (
    <div className="ButtonSidebar-Container" onClick={click}>
      <div className="dotContainer">
        <span className={isActive ? 'dotActive' : 'dot'} />
      </div>
      <div className="textContainer">
        <span className={isActive ? 'textActive' : 'text'}>{title}</span>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default ButtonSidebar;
