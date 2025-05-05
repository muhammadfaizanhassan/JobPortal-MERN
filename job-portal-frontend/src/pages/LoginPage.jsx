// File: src/pages/LoginPage.jsx
import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white/20 backdrop-blur-sm shadow-2xl rounded-2xl p-8 transition-all duration-500 ease-out">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              w-full px-4 py-3
              bg-white bg-opacity-50 border border-white/50
              rounded-lg mb-4
              focus:outline-none focus:ring-2 focus:ring-indigo-300
              transition-shadow duration-200
            "
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              w-full px-4 py-3
              bg-white bg-opacity-50 border border-white/50
              rounded-lg mb-6
              focus:outline-none focus:ring-2 focus:ring-indigo-300
              transition-shadow duration-200
            "
          />
          <button
            type="submit"
            disabled={loading}
            className="
              w-full py-3
              bg-indigo-500 hover:bg-indigo-600
              active:scale-95 transform transition duration-150
              rounded-lg font-semibold text-white shadow-md
              disabled:opacity-50
            "
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
