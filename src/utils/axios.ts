import axios from 'axios';
import { message } from 'antd';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:44319/api', // Hardcode tạm thời để test
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Log request để debug
    console.log('Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data
    });
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Log response để debug
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    // Log error để debug
    console.error('API Error:', {
      url: error.config?.url,
      status: error.response?.status,
      data: error.response?.data
    });

    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          message.error('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại');
          window.location.href = '/login';
          break;
        case 403:
          message.error('Bạn không có quyền thực hiện thao tác này');
          break;
        case 404:
          message.error('Không tìm thấy dữ liệu yêu cầu');
          break;
        case 400:
          const errorMessage = error.response.data.message || 'Dữ liệu không hợp lệ';
          message.error(errorMessage);
          break;
        default:
          message.error('Có lỗi xảy ra, vui lòng thử lại');
      }
    } else if (error.request) {
      message.error('Không thể kết nối đến server');
    } else {
      message.error('Có lỗi xảy ra, vui lòng thử lại');
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance; 