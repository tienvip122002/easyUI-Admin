import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { aboutUsService } from '../services/aboutUs.service';
import { AboutUs } from '../models/aboutUs';

export const useGetAboutUs = () => {
  return useQuery<AboutUs[]>({
    queryKey: ['aboutUs'],
    queryFn: () => aboutUsService.getAboutUs(),
  });
};

export const useGetAboutUsById = (id: string) => {
  return useQuery<AboutUs>({
    queryKey: ['aboutUs', id],
    queryFn: () => aboutUsService.getAboutUsById(id),
  });
};

export const useCreateAboutUs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<AboutUs>) => aboutUsService.createAboutUs(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutUs'] });
    },
  });
};

export const useUpdateAboutUs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AboutUs> }) => 
      aboutUsService.updateAboutUs(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutUs'] });
    },
  });
};

export const useDeleteAboutUs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => aboutUsService.deleteAboutUs(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutUs'] });
    },
  });
};

export const useSearchAboutUs = (keyword: string) => {
  return useQuery<AboutUs[]>({
    queryKey: ['aboutUs', 'search', keyword],
    queryFn: () => aboutUsService.searchAboutUs(keyword),
    enabled: !!keyword, // Chỉ chạy khi có keyword
  });
}; 