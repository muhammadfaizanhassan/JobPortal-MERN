// File: src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
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