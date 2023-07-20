import { sessionActions } from '../redux/slices/sessionSlice';
import { authService } from '../services/authServices';
import axios from './axios';

interface iTokeExp {
  accessExp: number;
  refreshExp: number;
  refresh: string;
}

// ----------------------------------------------------------------------

const jwtDecode = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(''),
  );

  return JSON.parse(jsonPayload);
};

// ----------------------------------------------------------------------

const tokenExpired = ({ accessExp, refreshExp, refresh }: iTokeExp) => {
  // get time now
  const currentTime = Date.now();

  // find out more time work token time access or refresh
  const timerTime = () => {
    if (accessExp > refreshExp) {
      return refreshExp * 1000 - currentTime;
    }
    return accessExp * 1000 - currentTime;
  };

  // set time out to close session or request to get new access token
  setTimeout(async () => {
    if (accessExp > refreshExp) {
      sessionActions.logout();
    } else {
      const result = await authService.refresh(refresh);
      if (result.res) {
        sessionActions.refresh(result.res.accessToken);
        setSession(result.res.accessToken, refresh);
      } else {
        sessionActions.logout();
      }
    }
  }, timerTime());
};

// ----------------------------------------------------------------------

export const setSession = (access: string, refresh: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${access}`;

  const accessDecode = jwtDecode(access);
  const refreshDecode = jwtDecode(refresh);

  tokenExpired({
    accessExp: accessDecode.exp,
    refreshExp: refreshDecode.exp,
    refresh: refresh,
  });
};
