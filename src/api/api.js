import axios from 'axios';
import {store} from '../store/store.js'
import { clearAuth } from '../store/authSlice.js';
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});


// i have created this to privent hidden api call failure when tocken expires
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(clearAuth());
    }
    return Promise.reject(error);
  }
);

export default instance;