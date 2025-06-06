import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const { login, isSubmitting, errors } = useAuth(); // Usa los estados y funciones del hook
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await login(formData); // Usa la función login del hook useAuth
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setResetEmailSent(false);

    try {
      // Aquí puedes reutilizar la lógica de Axios o crear un método en useAuth para manejar esto
      await login({ email: formData.email }); // Simula el envío de recuperación
      setResetEmailSent(true);
    } catch (error) {
      console.error('Error al enviar el email de recuperación:', error);
    }
  };

  if (resetEmailSent) {
    return (
      <div className="password-reset-sent">
        <h2>Email enviado</h2>
        <div className="alert alert-success">
          Hemos enviado un enlace para restablecer tu contraseña a tu dirección de email.
        </div>
        <button
          onClick={() => {
            setResetEmailSent(false);
            setShowForgotPassword(false);
          }}
          className="btn btn-primary"
        >
          Volver al Login
        </button>
      </div>
    );
  }

  return (
    <div className="auth-container">
      {!showForgotPassword ? (
        <form onSubmit={handleLoginSubmit} className="login-form">
          <h2>Iniciar Sesión</h2>

          {errors.general && <div className="alert alert-danger">{errors.general[0]}</div>}

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
            {errors.email && <span className="error-message">{errors.email[0]}</span>}
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
            />
            {errors.password && <span className="error-message">{errors.password[0]}</span>}
          </div>

          <div className="form-footer">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </button>

            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowForgotPassword(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleForgotPasswordSubmit} className="forgot-password-form">
          <h2>Recuperar Contraseña</h2>

          <div className="form-group">
            <p>Ingresa tu dirección de email y te enviaremos un enlace para restablecer tu contraseña.</p>
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
            {errors.email && <span className="error-message">{errors.email[0]}</span>}
          </div>

          <div className="form-footer">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Enviando...
                </>
              ) : (
                'Enviar enlace'
              )}
            </button>

            <button
              type="button"
              className="btn btn-link"
              onClick={() => setShowForgotPassword(false)}
            >
              Volver al Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
}