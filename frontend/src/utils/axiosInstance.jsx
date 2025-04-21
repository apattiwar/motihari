import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://motihari-1.onrender.com/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.data === 'Token expired') {
      localStorage.clear();
      window.location.href = '/login';
    } 
    return Promise.reject(err);
  }
);

export default axiosInstance;
