import { apiService } from './api';
import { API_CONFIG } from '../config/apiConfig';
import { LoginRequest, RegisterRequest, AuthResponse } from '../models/auth';

export const authService = {
  login: async (data: LoginRequest) => {
    const response = await apiService.post<AuthResponse>(
      API_CONFIG.endpoints.auth.login,
      data
    );
    return response.data;
  },

  register: async (data: RegisterRequest) => {
    const response = await apiService.post<AuthResponse>(
      API_CONFIG.endpoints.auth.register,
      data
    );
    return response.data;
  }
}; 