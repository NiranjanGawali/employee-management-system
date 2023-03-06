import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-type': 'application/json',
  },
});

AxiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = JSON.parse(localStorage.getItem('token'));
  config.headers['token'] = token;
  return config;
});

export default AxiosInstance;
