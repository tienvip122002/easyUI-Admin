import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: '/api',
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

    // Xử lý các loại lỗi
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          message.error('Phiên đăng nhập hết hạn');
          window.location.href = '/login';
          break;
        case 404:
          message.error('Không tìm thấy dữ liệu');
          break;
        default:
          message.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    }
    
    if (error.response?.status === 401) {
      // Clear token and redirect to login
      localStorage.removeItem('token');
      window.location.href = '/login';
      message.error('Phiên đăng nhập đã hết hạn');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 