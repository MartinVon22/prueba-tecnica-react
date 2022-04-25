/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === 'Network Error' && !error.response) {
      return Promise.reject('axios.errors.network');
    }
    const { status } = error.response;

    if (status === 400) {
      if (error.response.data.errors) {
        return Promise.reject(error.response.data.errors[0].msg);
      }
      return Promise.reject(error.response.data.msg);
    }
    if (status === 401) {
      return Promise.reject('axios.errors.unauthorized');
    }
    if (status === 404) {
      return Promise.reject('axios.errors.resourceNotFound');
    }
    if (status === 500) {
      return Promise.reject('axios.errors.server');
    }
    return null;
  }
);

export default axiosClient;
