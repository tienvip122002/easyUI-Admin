import * as yup from 'yup';

export const CreateCartSchema = yup.object().shape({
  uiComponentId: yup
    .string()
    .required('ID Component không được để trống'),
  quantity: yup
    .number()
    .min(1, 'Số lượng phải lớn hơn 0')
    .required('Số lượng không được để trống')
});

export const UpdateCartSchema = yup.object().shape({
  quantity: yup
    .number()
    .min(0, 'Số lượng không được âm')
    .required('Số lượng không được để trống')
});

export interface CreateCartRequest {
  uiComponentId: string;
  quantity: number;
}

export interface UpdateCartRequest {
  quantity: number;
} 