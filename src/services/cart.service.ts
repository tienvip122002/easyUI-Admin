import axiosInstance from './axios.config';
import { CreateCartRequest, UpdateCartRequest } from '../validations/cart.schema';

const API_URL = 'Cart';

export interface Cart {
  id: string;
  uiComponentId: string;
  uiComponentName: string;
  price: number;
  quantity: number;
  createdAt: string;
}

class CartService {
  async getCarts(): Promise<Cart[]> {
    try {
      console.log('Calling API:', API_URL);
      const response = await axiosInstance.get(API_URL);
      console.log('API Response:', response);
      return response.data;
    } catch (error: any) {
      console.error('GetCarts Error:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config
      });
      throw error;
    }
  }

  async createCart(data: CreateCartRequest): Promise<Cart> {
    const response = await axiosInstance.post<Cart>(API_URL, data);
    return response.data;
  }

  async updateCart(id: string, data: UpdateCartRequest): Promise<Cart> {
    const response = await axiosInstance.put<Cart>(
      `${API_URL}/${id}`,
      data
    );
    return response.data;
  }

  async deleteCart(id: string): Promise<void> {
    await axiosInstance.delete(`${API_URL}/${id}`);
  }
}

export const cartService = new CartService(); 