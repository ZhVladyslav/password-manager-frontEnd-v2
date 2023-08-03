import React from 'react';
import { SvgEdit, SvgLogout, SvgPlus, SvgProtect, SvgTrash } from '../../assets';
import { ButtonRound, ContextMenu } from '../../components';
import './Header.scss';

// ----------------------------------------------------------------------

interface IProps {
  title?: string;
  buttonBlock?: React.ReactNode
}

// ----------------------------------------------------------------------

const Header: React.FC<IProps> = ({ title, buttonBlock }) => {
  return (
    <header className="Header-Container">
      <div className="inner-container">
        <div className="leftBlock">{title && <h3>{title}</h3>}</div>
        <div className="rightBlock">
          <div className="buttonBlock">
            {buttonBlock && buttonBlock}
          </div>
        </div>
      </div>
    </header>
  );
};

// ----------------------------------------------------------------------

export default Header;
