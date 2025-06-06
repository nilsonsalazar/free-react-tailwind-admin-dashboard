import React, { useEffect } from 'react';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Inyectar Bootstrap solo al montar
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
    link.id = 'bootstrap-login-css';
    document.head.appendChild(link);

    return () => {
      // Eliminar al desmontar
      const existingLink = document.getElementById('bootstrap-login-css');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return <>{children}</>;
};

export default LoginLayout;