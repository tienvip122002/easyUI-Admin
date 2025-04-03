export interface UIComponent {
  id: string;
  name: string;
  code: string;
  description?: string;
  previewUrl?: string;
  type: string;
  framework: string;
  css?: string;
  html?: string;
  js?: string;
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

export interface UpdateUIComponentDto extends Partial<CreateUIComponentDto> {} 