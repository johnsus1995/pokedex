import axios, { AxiosError, AxiosResponse } from 'axios';
import { AxiosRequestHeaders } from 'axios';
import Qs from 'qs';

const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL as string,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => Qs.stringify(params, { arrayFormat: 'brackets' }),
  },
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  function (config) {
    // local storage is not available in SSR, will be needed in client side
    // const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : '';

    config.headers = {
      'Content-Type': 'application/json',
      // Authorization: token ? `Bearer ${token}` : '',
      ...config.headers,
    } as AxiosRequestHeaders;

    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      // Handle 401 status and avoid infinite retries
      window.location.pathname = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
