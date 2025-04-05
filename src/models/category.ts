export interface Category {
  id: string;
  name: string;
  description?: string;
  parentId?: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CreateCategoryDto {
  name: string;
  description?: string | null;
  parentId?: string | null;
}

export interface UpdateCategoryRequest {
  name: string;
  description?: string | null;
  parentId?: string | null;
  isActive?: boolean;
} 