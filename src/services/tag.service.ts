import axiosInstance from './axios.config';
import { Tag, CreateTagDto, UpdateTagRequest } from '../models/tag';

const API_URL = 'Tag';

export const TagService = {
  getAll: async (): Promise<Tag[]> => {
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

  getById: async (id: string): Promise<Tag> => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
  },

  create: async (data: CreateTagDto): Promise<Tag> => {
    try {
      const apiData = {
        name: data.name.trim()
      };

      console.log('API Data being sent:', JSON.stringify(apiData, null, 2));
      const response = await axiosInstance.post(API_URL, apiData);
      console.log('Server response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Create tag error:', error);
      throw error;
    }
  },

  update: async (id: string, data: UpdateTagRequest): Promise<Tag> => {
    try {
      const apiData = {
        name: data.name.trim()
      };

      const response = await axiosInstance.put(`${API_URL}/${id}`, apiData);
      return response.data;
    } catch (error) {
      console.error('Update tag error:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }
}; 