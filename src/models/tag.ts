export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CreateTagDto {
  name: string;
}

export interface UpdateTagRequest {
  name: string;
} 