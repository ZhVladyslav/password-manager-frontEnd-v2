import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import style from './main.layout.module.scss';
import { sessionService } from '../services/session.service';
import { userActions } from '../redux/actions/userActions';
import { sessionActions } from '../redux/actions/sessionActions';
import { userSession } from '../auth/userSession';
import { PATH_HOME, PATH_PASS_COLLECTION, PATH_ROLE, PATH_USER } from '../routes/paths';
import { SvgLogout, SvgUser } from '../assets';
import Logo from '../assets/logo.png';

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = async () => {
    await sessionService.logout();
    userActions.logout();
    sessionActions.close();
    userSession.close();
  };

  const checkLocation = (path: RegExp) => {
    if (path.test(location.pathname)) {
      return style.active_button;
    }
    return '';
  };

  return (
    <>
      <div className={style.container}>
        <nav className={style.nav}>
          <div className={style.logo} onClick={() => navigate(PATH_HOME.HOME)}>
            <img src={Logo} />
            <span>Password manager</span>
          </div>

          {/* OVERVIEW */}
          <ul>
            <h2>Overview</h2>
            <li
              onClick={() => navigate(PATH_PASS_COLLECTION.LIST)}
              className={checkLocation(/^\/passCollection/)}
            >
              <span>Password collections</span>
            </li>
          </ul>

          {/* MANAGEMENT */}
          <ul>
            <h2>Management</h2>
            <li onClick={() => navigate(PATH_ROLE.LIST)} className={checkLocation(/^\/role/)}>
              <span>Roles</span>
            </li>
            <li className={checkLocation(/^\/users\/list/)}>
              <span>Users</span>
            </li>
          </ul>

          {/* USER */}
          <div className={style.account_block}>
            <div className={style.svgContainer} onClick={() => navigate(PATH_USER.SETTINGS)}>
              <div className={style.svg}>
                <SvgUser />
              </div>
            </div>
            <div className={style.svgContainer} onClick={logout}>
              <div className={style.svg}>
                <SvgLogout />
              </div>
            </div>
          </div>
        </nav>

        <main className={style.content}>
          <Outlet />
        </main>
      </div>
    </>
  );
}
