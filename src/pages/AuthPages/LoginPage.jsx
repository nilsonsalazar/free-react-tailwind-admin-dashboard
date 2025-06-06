import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/Auth/LoginForm';
import RegisterForm from '../../components/Auth/RegisterForm';
import '../../css/auth.css';

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState('login');

  useEffect(() => {
    // Crear el elemento link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-css';

    // Insertarlo en el <head>
    document.head.appendChild(link);

    // Cleanup: quitar Bootstrap al desmontar
    return () => {
      const existingLink = document.getElementById('bootstrap-css');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <div className="auth-page d-flex align-items-center justify-content-center vh-100">
      <div className="auth-box p-4 rounded shadow-lg bg-white text-center">
        <img src="../images/logo.png" alt="Logo" className="mb-3 logo-small" />

        <ul className="nav nav-pills mb-4 d-flex justify-content-center">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
              onClick={() => setActiveTab('login')}
            >
              Iniciar Sesión
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
              onClick={() => setActiveTab('register')}
            >
              Registro
            </button>
          </li>
        </ul>

        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};

export default LoginPage;
