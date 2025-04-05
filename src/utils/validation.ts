import { ValidationError } from 'yup';
import { message } from 'antd';

export const validateSchema = async (schema: any, values: any) => {
  try {
    await schema.validate(values, { abortEarly: false });
  } catch (error) {
    if (error instanceof ValidationError) {
      error.inner.forEach((err) => {
        message.error(err.message);
      });
    }
    throw error;
  }
}; 