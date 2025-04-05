import { useState, useCallback } from 'react';
import { Category, CreateCategoryDto, UpdateCategoryRequest } from '../models/category';
import { CategoryService } from '../services/category.service';
import { message } from 'antd';

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await CategoryService.getAll();
      setCategories(data);
    } catch (error) {
      message.error('Failed to fetch categories');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createCategory = useCallback(async (data: CreateCategoryDto) => {
    try {
      setLoading(true);
      await CategoryService.create(data);
      message.success('Category created successfully');
      await fetchCategories();
    } catch (error) {
      message.error('Failed to create category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const updateCategory = useCallback(async (id: string, data: UpdateCategoryRequest) => {
    try {
      setLoading(true);
      await CategoryService.update(id, data);
      message.success('Category updated successfully');
      await fetchCategories();
    } catch (error) {
      message.error('Failed to update category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  const deleteCategory = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await CategoryService.delete(id);
      message.success('Category deleted successfully');
      await fetchCategories();
    } catch (error) {
      message.error('Failed to delete category');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchCategories]);

  return {
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory
  };
}; 