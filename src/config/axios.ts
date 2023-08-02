import axiosImport from 'axios';
import { API } from './config';

// axios.defaults.headers.common['X-Access-Token'] = String(localStorage.getItem('authToken'));

// ----------------------------------------------------------------------

const axios = axiosImport.create({
  baseURL: API,
});

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     return Promise.reject((error.response && error.response.data) || 'Something went wrong');
//   },
// );

// axios.interceptors.request.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default axios;
