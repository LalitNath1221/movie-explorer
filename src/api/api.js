import axios from 'axios';
import { store } from '../store/store.js';
import { clearAuth } from '../store/authSlice.js';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// request interceptor — attach token from localStorage
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  //console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor — clear auth on 401
// TODO: move to httpOnly cookie once cross-domain cookie issue is resolved
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

export default instance;