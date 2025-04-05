import axiosInstance from './axios.config';
import { Category, CreateCategoryDto, UpdateCategoryRequest } from '../models/category';

const API_URL = 'Category';

export const CategoryService = {
  getAll: async (): Promise<Category[]> => {
    try {
      console.log('Calling API:', API_URL);
      const response = await axiosInstance.get(API_URL);
      console.log('API Response:', response);
      
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.items && Array.isArray(response.data.items)) {
        return response.data.items;
      } else {
        console.error('Unexpected response format:', response.data);
        return [];
      }
    } catch (error: any) {
      console.error('GetAll Error:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Category> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateCategoryDto): Promise<Category> => {
    try {
      const apiData = {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        parentId: data.parentId || null
      };

      console.log('API Data being sent:', JSON.stringify(apiData, null, 2));
      const response = await axiosInstance.post(API_URL, apiData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create category error:', error);
      throw error;
    }
  },

  update: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    try {
      const apiData = {
        name: data.name.trim(),
        description: data.description?.trim() || null,
        parentId: data.parentId || null,
        isActive: data.isActive
      };

      const response = await axiosInstance.put(`${API_URL}/${id}`, apiData);
      return response.data;
    } catch (error) {
      console.error('Update category error:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }
}; 