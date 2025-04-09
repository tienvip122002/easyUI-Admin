import axiosInstance from './axios.config';
import { Order } from '../models/order';

class OrderService {
  async getOrders(): Promise<Order[]> {
    const response = await axiosInstance.get('/admin/orders');
    return response.data;
  }

  async updateOrderStatus(id: string, status: string): Promise<void> {
    await axiosInstance.put(`/admin/orders/${id}/status`, { status });
  }
}

export const orderService = new OrderService(); 