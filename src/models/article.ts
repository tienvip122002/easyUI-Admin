// Base Article interface
export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  status: 'published' | 'draft';
  featuredImage?: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  viewCount: number;
  authorId: string;
  author?: UserSummaryResponse;
}

// API Response interfaces
export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  status: 'published' | 'draft';
  featuredImage: string;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string;
  viewCount: number;
  authorId: string;
  author?: UserSummaryResponse;
}

export interface ArticleSummaryResponse {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  featuredImage?: string;
  publishedAt?: string;
  viewCount: number;
  authorId: string;
  author?: UserSummaryResponse;
}

export interface UserSummaryResponse {
  id: string;
  userName: string;
  fullName: string;
  avatarUrl?: string;
}

// Request Payload interfaces
export interface CreateArticleRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  status: 'published' | 'draft';
  featuredImage?: string;
  publishedAt?: string;
}

export interface UpdateArticleRequest {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags?: string[];
  status: 'published' | 'draft';
  featuredImage?: string;
}

export interface SearchArticleRequest {
  searchTerm?: string;
  category?: string;
  tags?: string[];
  authorId?: string;
  status?: 'published' | 'draft';
  pageNumber: number;
  pageSize: number;
}

// Pagination response
export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
} 