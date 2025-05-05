// File: src/pages/Register.jsx
import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('jobseeker');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post('/auth/register', { name, email, password, role });
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">

      <div className="w-full max-w-md bg-white/20 backdrop-blur-sm shadow-2xl rounded-2xl p-8 transition-all duration-500 ease-out">
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Register</h2>
        <form onSubmit={handleRegister}>
          {error && <p className="text-red-300 text-center mb-4">{error}</p>}

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                w-full px-4 py-3
                bg-white bg-opacity-50 border border-white/50
                rounded-lg mb-2
                focus:outline-none focus:ring-2 focus:ring-indigo-300
                transition-shadow duration-200
              "
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="
                w-full px-4 py-3
                bg-white bg-opacity-50 border border-white/50
                rounded-lg mb-2
                focus:outline-none focus:ring-2 focus:ring-indigo-300
                transition-shadow duration-200
              "
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="block text-sm font-medium text-white/90 mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={passwordVisible ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="
                w-full px-4 py-3
                bg-white bg-opacity-50 border border-white/50
                rounded-lg pr-10
                focus:outline-none focus:ring-2 focus:ring-indigo-300
                transition-shadow duration-200
              "
            />
            <span
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/90 cursor-pointer"
            >
              <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="text-black"/>
            </span>
          </div>

          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-white/90 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="
                w-full px-4 py-3
                bg-white bg-opacity-50 border border-white/50
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-300
                transition-shadow duration-200
              "
            >
              <option value="jobseeker">Jobseeker</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>

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
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
