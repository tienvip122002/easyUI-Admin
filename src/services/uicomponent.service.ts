import axiosInstance from './axios.config';
import { UIComponent, CreateUIComponentDto, UpdateUIComponentDto, UpdateUIComponentRequest } from '../models/uicomponent';

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
  categoryId?: string;
  tagIds?: string[];
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
        // Đảm bảo price luôn là số (0 thay vì null)
        price: data.price !== undefined && data.price !== null ? Number(data.price) : 0,
        // Đảm bảo discountPrice luôn là số (0 thay vì null)
        discountPrice: data.discountPrice !== undefined && data.discountPrice !== null ? Number(data.discountPrice) : 0,
        categoryId: data.categoryId
      };

      console.log('API Data being sent:', JSON.stringify(apiData, null, 2));
      const response = await axiosInstance.post('/UIComponent', apiData);
      console.log('Server response:', response.data);
      
      // If the component was created successfully and has a category, add it
      if (response.data && response.data.id && data.categoryId) {
        console.log('Adding category to component:', data.categoryId);
        await axiosInstance.post(`/UIComponent/${response.data.id}/categories`, {
          categoryIds: [data.categoryId]
        });
      }
      
      // If the component was created successfully and has tags, add them
      if (response.data && response.data.id && data.tagIds && data.tagIds.length > 0) {
        console.log('Adding tags to component:', data.tagIds);
        await axiosInstance.post(`/UIComponent/${response.data.id}/tags`, {
          tagIds: data.tagIds
        });
      }
      
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
        // Đảm bảo price luôn là số (0 thay vì null)
        price: data.price !== undefined && data.price !== null ? Number(data.price) : 0,
        // Đảm bảo discountPrice luôn là số (0 thay vì null)
        discountPrice: data.discountPrice !== undefined && data.discountPrice !== null ? Number(data.discountPrice) : 0,
        categoryId: data.categoryId
      };

      const response = await axiosInstance.put(`${API_URL}/${id}`, apiData);
      console.log('Update response:', response.data); // Debug log
      
      // Update category if provided
      if (data.categoryId) {
        console.log('Updating category for component:', data.categoryId);
        await axiosInstance.post(`${API_URL}/${id}/categories`, {
          categoryIds: [data.categoryId]
        });
      }
      
      // Update tags if provided
      if (data.tagIds && data.tagIds.length > 0) {
        console.log('Updating tags for component:', data.tagIds);
        await axiosInstance.post(`${API_URL}/${id}/tags`, {
          tagIds: data.tagIds
        });
      }
      
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