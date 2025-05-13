import { useState, useCallback } from 'react';
import { 
  ArticleResponse, 
  ArticleSummaryResponse, 
  CreateArticleRequest, 
  UpdateArticleRequest,
  SearchArticleRequest,
  PaginatedResponse
} from '../models/article';
import { ArticleService } from '../services/article.service';

export const useArticles = () => {
  const [articles, setArticles] = useState<ArticleResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [article, setArticle] = useState<ArticleResponse | null>(null);

  // Fetch articles with pagination
  const fetchArticles = useCallback(async (page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ArticleService.getAll(page, size);
      setArticles(response.items);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setCurrentPage(response.pageNumber);
      setPageSize(response.pageSize);
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching articles');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch single article by ID
  const fetchArticleById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ArticleService.getById(id);
      setArticle(data);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching the article');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch latest articles
  const fetchLatestArticles = useCallback(async (count: number = 5) => {
    try {
      setLoading(true);
      setError(null);
      const data = await ArticleService.getLatest(count);
      return data;
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching latest articles');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch articles by author
  const fetchArticlesByAuthor = useCallback(async (authorId: string, page: number = 1, size: number = 10) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ArticleService.getByAuthor(authorId, page, size);
      return response;
    } catch (err: any) {
      setError(err.message || 'An error occurred while fetching author articles');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search articles
  const searchArticles = useCallback(async (searchRequest: SearchArticleRequest) => {
    try {
      setLoading(true);
      setError(null);
      const response = await ArticleService.search(searchRequest);
      setArticles(response.items);
      setTotalCount(response.totalCount);
      setTotalPages(response.totalPages);
      setCurrentPage(response.pageNumber);
      setPageSize(response.pageSize);
      return response;
    } catch (err: any) {
      setError(err.message || 'An error occurred while searching articles');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Create article
  const createArticle = useCallback(async (articleData: CreateArticleRequest) => {
    try {
      setLoading(true);
      setError(null);
      const createdArticle = await ArticleService.create(articleData);
      return createdArticle;
    } catch (err: any) {
      setError(err.message || 'An error occurred while creating the article');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update article
  const updateArticle = useCallback(async (id: string, articleData: UpdateArticleRequest) => {
    try {
      setLoading(true);
      setError(null);
      await ArticleService.update(id, articleData);
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred while updating the article');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete article
  const deleteArticle = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await ArticleService.delete(id);
      // If successful, remove from local state
      setArticles(prevArticles => prevArticles.filter(article => article.id !== id));
      return true;
    } catch (err: any) {
      setError(err.message || 'An error occurred while deleting the article');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Change page
  const changePage = useCallback((page: number, size?: number) => {
    fetchArticles(page, size || pageSize);
  }, [fetchArticles, pageSize]);

  return {
    articles,
    article,
    loading,
    error,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    fetchArticles,
    fetchArticleById,
    fetchLatestArticles,
    fetchArticlesByAuthor,
    searchArticles,
    createArticle,
    updateArticle,
    deleteArticle,
    changePage,
  };
}; 