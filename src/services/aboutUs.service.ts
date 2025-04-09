import axiosInstance from './axios.config';
import { AboutUs } from '../models/aboutUs';

class AboutUsService {
  async getAboutUs(): Promise<AboutUs[]> {
    const response = await axiosInstance.get('/AboutUs');
    return response.data;
  }

  async getAboutUsById(id: string): Promise<AboutUs> {
    const response = await axiosInstance.get(`/AboutUs/${id}`);
    return response.data;
  }

  async createAboutUs(data: Partial<AboutUs>): Promise<AboutUs> {
    const response = await axiosInstance.post('/AboutUs', data);
    return response.data;
  }

  async updateAboutUs(id: string, data: Partial<AboutUs>): Promise<AboutUs> {
    const response = await axiosInstance.put(`/AboutUs/${id}`, data);
    return response.data;
  }

  async deleteAboutUs(id: string): Promise<void> {
    await axiosInstance.delete(`/AboutUs/${id}`);
  }

  async searchAboutUs(keyword: string): Promise<AboutUs[]> {
    const response = await axiosInstance.post('/AboutUs/search', { keyword });
    return response.data;
  }
}

export const aboutUsService = new AboutUsService(); 