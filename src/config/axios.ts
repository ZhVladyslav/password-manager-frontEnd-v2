import axiosImport from 'axios';
import { API } from './config';
import { userActions } from '../redux/actions/userActions';
import { sessionActions } from '../redux/actions/sessionActions';
import { userSession } from '../auth/userSession';
import { utilsActions } from '../redux/actions/utilsActions';

const logout = async () => {
  userActions.logout();
  sessionActions.close();
  userSession.close();
};

const axios = axiosImport.create({
  baseURL: API,
});

axios.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response) {
      if (error.response.status === 401) logout();
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  },
);

export default axios;
