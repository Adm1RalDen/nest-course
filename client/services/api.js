import * as axios from 'axios';
import StorageService from 'services/local-storage';

const storage = StorageService.getInstance();

export const URL = {
  development: 'https://nest-course.herokuapp.com/', //'http://192.168.0.106:5000',
  production: '/',
};

const api = axios.create({
  baseURL: URL[process.env.NODE_ENV],
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = storage.getCredentials();
    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      storage.removeCredentials();
      if (!window.location.href.includes('login')) {
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  },
);

export default api;
