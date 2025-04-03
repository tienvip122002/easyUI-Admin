import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { authService } from '../services/authService';
import { LoginRequest, RegisterRequest } from '../models/auth';

const loginSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
});

const registerSchema = yup.object().shape({
  email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
  password: yup.string()
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .required('Mật khẩu là bắt buộc'),
  fullName: yup.string().required('Họ tên là bắt buộc'),
  phoneNumber: yup.string()
});

export const useAuth = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: LoginRequest) => {
    try {
      setLoading(true);
      setError(null);
      await loginSchema.validate(data);
      
      const response = await authService.login(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      navigate('/');
      return response;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || 'Đăng nhập thất bại');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    try {
      setLoading(true);
      setError(null);
      await registerSchema.validate(data);
      
      const response = await authService.register(data);
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      navigate('/');
      return response;
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setError(err.message);
      } else if (err instanceof Error) {
        setError(err.message || 'Đăng ký thất bại');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return {
    login,
    register,
    logout,
    loading,
    error
  };
}; 