export const API_CONFIG = {
  baseURL: 'https://localhost:44319/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  endpoints: {
    auth: {
      login: '/Auth/login',
      register: '/Auth/register'
    },
    // Thêm các endpoint khác ở đây
  }
}; 