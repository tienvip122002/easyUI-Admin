import axiosInstance from './axios.config';
import { UIComponent, CreateUIComponentDto, UpdateUIComponentDto } from '../models/uicomponent';

const API_URL = 'UIComponent';

interface CreateUIComponentRequest {
  name: string;
  description?: string | null;
  html?: string | null;
  css?: string | null;
  js?: string | null;
  previewUrl?: string | null;
  type: string;
  framework: string;
  price?: number | null;
  discountPrice?: number | null;
}

export const UIComponentService = {
  getAll: async (): Promise<UIComponent[]> => {
    try {
      console.log('Calling API:', API_URL);
      const response = await axiosInstance.get(API_URL);
      console.log('API Response:', response);
      
      // Đảm bảo response.data là array
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.items && Array.isArray(response.data.items)) {
        return response.data.items;
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
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

  create: async (data: CreateUIComponentRequest): Promise<UIComponent> => {
    try {
      const apiData = {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        html: data.html?.trim() || null,
        css: data.css?.trim() || null,
        js: data.js?.trim() || null,
        previewUrl: data.previewUrl?.trim() || null,
        type: data.type.trim(),
        framework: data.framework.trim(),
        price: data.price ? Number(data.price) : null,
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null
      };

      console.log('API Data being sent:', JSON.stringify(apiData, null, 2));
      const response = await axiosInstance.post('/UIComponent', apiData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create component error:', error);
      throw error;
    }
  },

  update: async (id: string, data: UpdateUIComponentRequest): Promise<UIComponent> => {
    try {
      console.log('Sending update request with data:', data); // Debug log
      const apiData = {
        name: data.name,
        description: data.description || null,
        html: data.html || null,
        css: data.css || null,
        js: data.js || null,
        previewUrl: data.previewUrl || null,
        type: data.type,
        framework: data.framework,
        price: data.price ? Number(data.price) : null,
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null
      };

      const response = await axiosInstance.put(`${API_URL}/${id}`, apiData);
      console.log('Update response:', response.data); // Debug log
      return response.data;
    } catch (error) {
      console.error('Update service error:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }
}; 