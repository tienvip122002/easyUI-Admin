import * as yup from 'yup';

export const createUIComponentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  code: yup.string().required('Code is required'),
  description: yup.string(),
  previewUrl: yup.string().url('Must be a valid URL'),
  type: yup.string().required('Type is required'),
  framework: yup.string().required('Framework is required'),
});

export const updateUIComponentSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().nullable(),
  html: yup.string().nullable(),
  css: yup.string().nullable(),
  js: yup.string().nullable(),
  previewUrl: yup.string().url('Must be a valid URL').nullable(),
  type: yup.string().required('Type is required'),
  framework: yup.string().required('Framework is required'),
  price: yup.number().nullable(),
  discountPrice: yup.number().nullable()
    .test('discount', 'Discount price must be less than price', 
      function(discountPrice) {
        const price = this.parent.price;
        if (!price || !discountPrice) return true;
        return discountPrice < price;
      })
}); 