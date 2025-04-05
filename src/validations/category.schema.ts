import * as yup from 'yup';

export const createCategorySchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),
  description: yup.string()
    .nullable()
    .max(500, 'Description must not exceed 500 characters'),
  parentId: yup.string().nullable()
});

export const updateCategorySchema = createCategorySchema.shape({
  isActive: yup.boolean()
}); 