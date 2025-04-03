import * as yup from 'yup';

export const createUIComponentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  code: yup.string().required('Code is required'),
  description: yup.string(),
  previewUrl: yup.string().url('Must be a valid URL'),
  type: yup.string().required('Type is required'),
  framework: yup.string().required('Framework is required'),
}); 