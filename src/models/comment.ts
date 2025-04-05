import { UIComponent } from './uicomponent';
import { ApplicationUser } from './user';

export interface Comment {
  id: string;
  content: string;
  componentId: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
  component?: UIComponent;
  creator?: ApplicationUser;
  updater?: ApplicationUser;
}

export interface CreateCommentDto {
  content: string;
  componentId: string;
}

export interface UpdateCommentRequest {
  content: string;
} 