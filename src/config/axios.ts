import axiosImport from 'axios';
import { API } from './config';

const axios = axiosImport.create({
  baseURL: API,
});

export default axios;
