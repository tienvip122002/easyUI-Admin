import axiosInstance from './axios.config';
import { Comment, CreateCommentDto, UpdateCommentRequest } from '../models/comment';

const API_URL = 'Comment';

export const CommentService = {
  getByComponentId: async (componentId: string): Promise<Comment[]> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/component/${componentId}`);
      return response.data;
    } catch (error) {
      console.error('Get comments error:', error);
      throw error;
    }
  },

  getById: async (id: string): Promise<Comment> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Get comment error:', error);
      throw error;
    }
  },

  create: async (data: CreateCommentDto): Promise<Comment> => {
    try {
      console.log('Creating comment:', data);
      const response = await axiosInstance.post(API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Create comment error:', error);
      throw error;
    }
  },

  update: async (id: string, data: UpdateCommentRequest): Promise<Comment> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Update comment error:', error);
      throw error;
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error('Delete comment error:', error);
      throw error;
    }
  }
}; 