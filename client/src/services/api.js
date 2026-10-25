import axios from 'axios';

// In production VITE_API_URL must be set at build time (see .env.example).
// The localhost fallback exists for local development only.
const baseURL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api');

if (!import.meta.env.DEV && !import.meta.env.VITE_API_URL) {
  console.error(
    'VITE_API_URL is not set - API calls will go to "/api" on this host.'
  );
}

const api = axios.create({
  baseURL,
  timeout: 30000, // free hosts can take a while to wake from sleep
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('homigo_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
