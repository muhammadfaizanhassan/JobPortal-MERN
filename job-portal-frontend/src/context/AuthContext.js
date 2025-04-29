// File: src/context/AuthContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const AuthContext = createContext();
export default AuthContext;

const SESSION_DURATION = 1000 * 60 * 60; // 1 hour in ms
const isSessionExpired = (authTime) => Date.now() - authTime > SESSION_DURATION;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Logout helper
  const logout = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  }, [navigate]);

  // Restore session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (isSessionExpired(parsed.authTime)) {
          logout(); // session expired
        } else {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.error('Auth restore error:', err);
      logout();
    } finally {
      setIsLoading(false);
    }
  }, [logout]);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      const userWithTime = {
        ...data.user,
        token: data.token,
        authTime: Date.now(),
      };

      localStorage.setItem('user', JSON.stringify(userWithTime));
      setUser(userWithTime);
      navigate('/');
    } catch (err) {
      throw new Error(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isLoading, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};