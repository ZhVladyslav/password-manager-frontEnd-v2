import React from 'react';
import { SvgBurgerMenu, SvgLogout, SvgProtect } from '../../../assets';
import { sessionActions } from '../../../redux/slices/sessionSlice';
import { authService } from '../../../services/authServices';
import { ButtonSvg } from '../../buttons';
import './Header1.scss';

// ----------------------------------------------------------------------

interface IProps {
  sidebarMenu: () => void;
  close: () => void;
}

// ----------------------------------------------------------------------

export default function HeaderGlobal({ sidebarMenu, close }: IProps) {
  const clickLogout = () => {
    authService.logout();
    sessionActions.logout();
  };

  return (
    <div className="Header1">
      <div className="leftBlock">
        <span className="menuButton">
          <ButtonSvg svg={<SvgBurgerMenu />} onClick={sidebarMenu} />
        </span>
      </div>
      <div className="rightBlock">
        <span className="rightBlock-span">
          <ButtonSvg svg={<SvgProtect />} onClick={close} bigSvg />
        </span>
        <span className="rightBlock-span">
          <ButtonSvg svg={<SvgLogout />} onClick={clickLogout} />
        </span>
      </div>
    </div>
  );
}
