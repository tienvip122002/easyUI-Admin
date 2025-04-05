import { useState, useCallback } from 'react';
import { Tag, CreateTagDto, UpdateTagRequest } from '../models/tag';
import { TagService } from '../services/tag.service';
import { message } from 'antd';

export const useTags = () => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const fetchTags = useCallback(async () => {
    try {
      setLoading(true);
      const data = await TagService.getAll();
      setTags(data);
    } catch (error) {
      message.error('Failed to fetch tags');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const createTag = useCallback(async (data: CreateTagDto) => {
    try {
      setLoading(true);
      await TagService.create(data);
      message.success('Tag created successfully');
      await fetchTags();
    } catch (error) {
      message.error('Failed to create tag');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchTags]);

  const updateTag = useCallback(async (id: string, data: UpdateTagRequest) => {
    try {
      setLoading(true);
      await TagService.update(id, data);
      message.success('Tag updated successfully');
      await fetchTags();
    } catch (error) {
      message.error('Failed to update tag');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchTags]);

  const deleteTag = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await TagService.delete(id);
      message.success('Tag deleted successfully');
      await fetchTags();
    } catch (error) {
      message.error('Failed to delete tag');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [fetchTags]);

  return {
    tags,
    loading,
    selectedTag,
    setSelectedTag,
    fetchTags,
    createTag,
    updateTag,
    deleteTag
  };
}; 