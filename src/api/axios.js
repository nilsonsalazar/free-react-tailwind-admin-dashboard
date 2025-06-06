import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // o tu API URL (ajusta según el entorno)
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  }
});

// Añadir el token automáticamente si existe
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
