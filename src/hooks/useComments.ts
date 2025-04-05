import { useState, useCallback } from 'react';
import { Comment, CreateCommentDto, UpdateCommentRequest } from '../models/comment';
import { CommentService } from '../services/comment.service';
import { message } from 'antd';

export const useComments = (componentId?: string) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const fetchComments = useCallback(async () => {
    if (!componentId) return;
    
    try {
      setLoading(true);
      const data = await CommentService.getByComponentId(componentId);
      setComments(data);
    } catch (error) {
      message.error('Failed to fetch comments');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [componentId]);

  const createComment = useCallback(async (data: CreateCommentDto) => {
    try {
      setLoading(true);
      const newComment = await CommentService.create(data);
      setComments(prev => [...prev, newComment]);
      message.success('Comment created successfully');
    } catch (error) {
      message.error('Failed to create comment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateComment = useCallback(async (id: string, data: UpdateCommentRequest) => {
    try {
      setLoading(true);
      const updatedComment = await CommentService.update(id, data);
      setComments(prev => 
        prev.map(comment => 
          comment.id === id ? updatedComment : comment
        )
      );
      message.success('Comment updated successfully');
    } catch (error) {
      message.error('Failed to update comment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteComment = useCallback(async (id: string) => {
    try {
      setLoading(true);
      await CommentService.delete(id);
      setComments(prev => prev.filter(comment => comment.id !== id));
      message.success('Comment deleted successfully');
    } catch (error) {
      message.error('Failed to delete comment');
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    comments,
    loading,
    selectedComment,
    setSelectedComment,
    fetchComments,
    createComment,
    updateComment,
    deleteComment
  };
}; 