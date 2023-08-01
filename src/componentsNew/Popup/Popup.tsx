import React from 'react';
import './Popup.scss';

// ----------------------------------------------------------------------

interface IProps {
  title: string;
  message: string;
  onClose: () => void;
  children: React.ReactNode;
}

// ----------------------------------------------------------------------

const Popup: React.FC<IProps> = ({ title, onClose, message, children }) => {
  const clickOnPopup = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className="Popup-Container" onClick={onClose}>
      <div className="Popup" onClick={clickOnPopup}>
        <h2 className="title">{title}</h2>
        <div className="message">{message}</div>
        <div className="buttonBlock">{children}</div>
      </div>
    </div>
  );
};

// ----------------------------------------------------------------------

export default Popup;
