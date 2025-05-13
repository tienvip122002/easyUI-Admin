import axios from 'axios';
import { 
  Article, 
  ArticleResponse, 
  ArticleSummaryResponse, 
  CreateArticleRequest, 
  UpdateArticleRequest,
  SearchArticleRequest,
  PaginatedResponse
} from '../models/article';

const API_URL = '/api/Article';

// Helper function to handle API errors
const handleError = (error: any) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(error.response.data.message || 'Server error');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server. Please check your network connection.');
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(error.message || 'An error occurred while making the request');
  }
};

// Article service for CRUD operations
export const ArticleService = {
  // Get all articles with pagination
  getAll: async (pageNumber = 1, pageSize = 10): Promise<PaginatedResponse<ArticleResponse>> => {
    try {
      const response = await axios.get<PaginatedResponse<ArticleResponse>>(
        `${API_URL}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Get article by ID
  getById: async (id: string): Promise<ArticleResponse> => {
    try {
      const response = await axios.get<ArticleResponse>(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Get latest articles
  getLatest: async (count = 5): Promise<ArticleSummaryResponse[]> => {
    try {
      const response = await axios.get<ArticleSummaryResponse[]>(`${API_URL}/latest?count=${count}`);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Get articles by author
  getByAuthor: async (authorId: string, pageNumber = 1, pageSize = 10): Promise<PaginatedResponse<ArticleSummaryResponse>> => {
    try {
      const response = await axios.get<PaginatedResponse<ArticleSummaryResponse>>(
        `${API_URL}/author/${authorId}?pageNumber=${pageNumber}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Search articles
  search: async (request: SearchArticleRequest): Promise<PaginatedResponse<ArticleResponse>> => {
    try {
      const response = await axios.post<PaginatedResponse<ArticleResponse>>(
        `${API_URL}/search`,
        request
      );
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Create new article
  create: async (articleData: CreateArticleRequest): Promise<ArticleResponse> => {
    try {
      const response = await axios.post<ArticleResponse>(API_URL, articleData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },

  // Update article
  update: async (id: string, articleData: UpdateArticleRequest): Promise<void> => {
    try {
      await axios.put(`${API_URL}/${id}`, articleData);
    } catch (error) {
      handleError(error);
    }
  },

  // Delete article
  delete: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      handleError(error);
    }
  }
}; 