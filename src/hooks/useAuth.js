// src/hooks/useAuth.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function useAuth() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const login = async (formData) => {
    setIsSubmitting(true);
    setErrors({});

    try {
      // Obtener CSRF token
      await api.get('/sanctum/csrf-cookie');

      // Intentar login
      const response = await api.post('/api/login', formData);

      if (response.data.access_token) {
        localStorage.setItem('auth_token', response.data.access_token);
        navigate('/dashboard');
      } else {
        throw new Error('Respuesta inesperada del servidor');
      }

    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else if (error.response?.status === 401) {
        setErrors({
          general: ['Credenciales incorrectas. Por favor, verifica tu email y contraseña.']
        });
      } else if (error.response?.status === 403) {
        setErrors({
          general: ['Tu cuenta no ha sido aprobada por el administrador.']
        });
      } else {
        setErrors({
          general: [error.response?.data?.message || 'Error en el servidor']
        });
        console.error('Error completo:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    login,
    isSubmitting,
    errors,
  };
}
