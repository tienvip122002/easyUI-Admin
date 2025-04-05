export interface UIComponent {
  id: string;
  name: string;
  description?: string;
  html?: string;
  css?: string;
  js?: string;
  previewUrl?: string;
  type: string;
  framework: string;
  price?: number | null;
  discountPrice?: number | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface CreateUIComponentDto {
  name: string;
  code: string;
  description?: string;
  previewUrl?: string;
  type: string;
  framework: string;
}

export interface UpdateUIComponentRequest {
  name: string;
  description?: string | null;
  html?: string | null;
  css?: string | null;
  js?: string | null;
  previewUrl?: string | null;
  type: string;
  framework: string;
  price?: number | null;
  discountPrice?: number | null;
}

export interface UpdateUIComponentDto extends Partial<CreateUIComponentDto> {} 