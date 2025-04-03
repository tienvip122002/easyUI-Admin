import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44319/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log để debug
  console.log('Request Config:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    baseURL: config.baseURL
  });
  
  return config;
});

// Thêm chi tiết log lỗi
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
    return Promise.reject(error);
  }
);

export default axiosInstance; 