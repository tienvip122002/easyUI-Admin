import * as yup from 'yup';

export const createCommentSchema = yup.object().shape({
  content: yup
    .string()
    .required('Content is required')
    .min(2, 'Content must be at least 2 characters')
    .max(1000, 'Content must not exceed 1000 characters'),
  componentId: yup
    .string()
    .required('Component ID is required')
});

export const updateCommentSchema = yup.object().shape({
  content: yup
    .string()
    .required('Content is required')
    .min(2, 'Content must be at least 2 characters')
    .max(1000, 'Content must not exceed 1000 characters')
}); 