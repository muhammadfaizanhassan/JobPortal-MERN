// File: src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jobportal-mern-9wgs.onrender.com/api',
});

// Attach JWT token to every request if present
api.interceptors.request.use((req) => {
  const stored = localStorage.getItem('user');
  if (stored) {
    const { token } = JSON.parse(stored);
    if (token) req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default api;
