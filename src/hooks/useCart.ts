import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from '../services/axios.config';
import { Cart, CreateCartRequest, UpdateCartRequest } from "@/models/Cart";

const API_URL = 'Cart';

export const useGetCarts = () => {
  return useQuery<Cart[]>({
    queryKey: ["carts"],
    queryFn: async () => {
      const response = await axiosInstance.get(API_URL);
      return response.data;
    }
  });
};

export const useCreateCart = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: CreateCartRequest) => {
      const response = await axiosInstance.post(API_URL, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    }
  });
};

export const useUpdateCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateCartRequest }) => {
      const response = await axiosInstance.put(`${API_URL}/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    }
  });
};

export const useDeleteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosInstance.delete(`${API_URL}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    }
  });
}; 