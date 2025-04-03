import axiosInstance from './axios.config';
import { UIComponent, CreateUIComponentDto, UpdateUIComponentDto } from '../models/uicomponent';

const API_URL = 'UIComponent';

interface CreateComponentDto {
  name: string;
  code: string;
  description?: string;
  previewUrl?: string;
  type: string;
  framework: string;
}

export const UIComponentService = {
  getAll: async (): Promise<UIComponent[]> => {
    try {
      console.log('Calling API:', API_URL);
      const response = await axiosInstance.get(API_URL);
      console.log('API Response:', response);
      return response.data;
    } catch (error: any) {
      console.error('GetAll Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config
      });
      throw error;
    }
  },

  getById: async (id: string): Promise<UIComponent> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateComponentDto): Promise<UIComponent> => {
    try {
      // Combine HTML, CSS, JS into code field
      const formattedData = {
        name: data.name,
        description: data.description,
        previewUrl: data.previewUrl,
        type: data.type,
        framework: data.framework,
        code: `
          <style>
            ${data.css || ''}
          </style>
          ${data.html || ''}
          <script>
            ${data.js || ''}
          </script>
        `.trim()
      };

      const response = await axiosInstance.post('/UIComponent', formattedData);
      return response.data;
    } catch (error) {
      console.error('Create component error:', error);
      throw error;
    }
  },

  update: async (id: string, data: UpdateUIComponentDto): Promise<UIComponent> => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }
}; 