import axiosInstance from './axios.config';
import { Profile } from '../models/profile';

export interface UpdateProfileRequest {
  fullName?: string;
  phoneNumber?: string;
  // Thêm các trường có thể cập nhật
}

class ProfileService {
  async getProfile(): Promise<Profile> {
    const response = await axiosInstance.get('/Auth/profile');
    return response.data;
  }

  async updateProfile(data: UpdateProfileRequest): Promise<Profile> {
    const response = await axiosInstance.put('/Auth/profile', data);
    return response.data;
  }
}

export const profileService = new ProfileService(); 