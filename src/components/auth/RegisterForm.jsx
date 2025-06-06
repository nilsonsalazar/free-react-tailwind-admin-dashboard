import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  // Configura Axios directamente con las credenciales
  const api = axios.create({
    baseURL: '/', // Usa ruta relativa al mismo dominio
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json'
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    if (formData.password !== formData.password_confirmation) {
      setErrors({ password_confirmation: ['Las contraseñas no coinciden'] });
      setIsSubmitting(false);
      return;
    }

    try {
      // Obtener CSRF Token (solo necesario si no usas el meta tag)
      await api.get('/sanctum/csrf-cookie');
      
      const response = await api.post('/api/register', formData);
      setRegistrationSuccess(true);
      
    } catch (error) {
      if (error.response?.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ 
          general: [error.response?.data?.message || 'Error en el servidor'] 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (registrationSuccess) {
    return (
      <div className="registration-success">
        <h2>¡Registro exitoso!</h2>
        <div className="alert alert-success">
          Tu cuenta está pendiente de aprobación. Serás notificado por correo.
        </div>
        <button onClick={() => navigate('/login')} className="btn btn-primary">
          Volver al Login
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Crear Cuenta</h2>
      
      {errors.general && <div className="alert alert-danger">{errors.general[0]}</div>}

      <div className={`form-group ${errors.name && 'has-error'}`}>
        <label>Nombre Completo</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
        {errors.name && <span className="error-message">{errors.name[0]}</span>}
      </div>

      <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && (
          <span className="error-message">{errors.email[0]}</span>
        )}
      </div>

      <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="8"
        />
        {errors.password && (
          <span className="error-message">{errors.password[0]}</span>
        )}
      </div>

      <div className={`form-group ${errors.password_confirmation ? 'has-error' : ''}`}>
        <label>Confirmar Contraseña</label>
        <input
          type="password"
          name="password_confirmation"
          className="form-control"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
        />
        {errors.password_confirmation && (
          <span className="error-message">{errors.password_confirmation[0]}</span>
        )}
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="spinner-border spinner-border-sm me-2"></span>
            Registrando...
          </>
        ) : 'Registrar'}
      </button>
    </form>
  );
}



