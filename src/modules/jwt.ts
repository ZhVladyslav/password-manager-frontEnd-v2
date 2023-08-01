import { sessionActions } from '../redux/slices/sessionSlice';
import { authService } from '../services/authServices';
import axios from './axios';
import jwtDecode from 'jwt-decode';
import { IAccessToken } from '../types/authType';

interface iTokeExp {
  accessExp: number;
  refresh: string;
}

// ----------------------------------------------------------------------

const tokenExpired = ({ accessExp, refresh }: iTokeExp) => {
  // get time now
  const currentTime = Date.now();
  // get time when access token expired
  // const expTokenDate = accessExp * 1000;
  const expTokenDate = currentTime + 10 * 1000; // DEV expire token for 10 seconds
  // session time
  const sessionTime = expTokenDate - currentTime;

  // set time out to close session or request to get new access token
  setTimeout(async () => {
    const result = await authService.refresh(refresh);
    if (result.res) {
      sessionActions.refresh(result.res.accessToken);
      setSession(result.res.accessToken, refresh);
    } else {
      sessionActions.logout();
    }
  }, sessionTime);
};

// ----------------------------------------------------------------------

export const setSession = async (access: string, refresh: string) => {
  const accessDecode = jwtDecode(access);
  const accessDecodeGhostType = accessDecode as IAccessToken;
  if (!('exp' in accessDecodeGhostType)) return;

  const currentTime = Date.now();

  if (currentTime > accessDecodeGhostType.exp * 1000) {
    const result = await authService.refresh(refresh);
    if (result.err) return;
    axios.defaults.headers.common.Authorization = `Bearer ${result.res.accessToken}`;
    tokenExpired({
      accessExp: accessDecodeGhostType.exp,
      refresh: refresh,
    });
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${access}`;
    tokenExpired({
      accessExp: accessDecodeGhostType.exp,
      refresh: refresh,
    });
  }
};
