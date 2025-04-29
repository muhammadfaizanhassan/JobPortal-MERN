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
  const navigate = useNavigate(); // To redirect to another page after successful registration

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sending POST request to the backend
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password,
        role,
      });

      // If registration is successful, you can store the token and user in localStorage or context
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);

      // Redirect to the login page or dashboard after successful registration
      navigate('/login');
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center mb-6">Register</h2>
      <form onSubmit={handleRegister} className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type={passwordVisible ? 'text' : 'password'}
            id="password"
            name="password"
            className="w-full p-2 border border-gray-300 rounded-md pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span 
            onClick={() => setPasswordVisible(!passwordVisible)} 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </span>
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="jobseeker">Jobseeker</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
