import axiosInstance from './axios.config';

export const API_ENDPOINTS = {
  CART: {
    BASE: '/cart',
    BY_ID: (id: string) => `/cart/${id}`
  }
} as const;

class ApiService {
  async get<T>(url: string) {
    const response = await axiosInstance.get<T>(url);
    return response;
  }

  async post<T>(url: string, data: any) {
    const response = await axiosInstance.post<T>(url, data);
    return response;
  }

  async put<T>(url: string, data: any) {
    const response = await axiosInstance.put<T>(url, data);
    return response;
  }

  async delete(url: string) {
    const response = await axiosInstance.delete(url);
    return response;
  }
}

export const apiService = new ApiService(); 