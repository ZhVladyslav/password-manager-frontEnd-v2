import axios from 'axios';
import { API } from '../config/config';

// axios.defaults.headers.common['X-Access-Token'] = String(localStorage.getItem('authToken'));

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: API,
});

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   },
// );

// axiosInstance.interceptors.request.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
