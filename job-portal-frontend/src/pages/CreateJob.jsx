// src/pages/CreateJob.jsx
import React, { useState, useContext } from 'react';
import axios from '../utils/axios';
import AuthContext from '../context/AuthContext';

const CreateJob = () => {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('full-time');
  const [company, setCompany] = useState(user?.company || '');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setLoading(true);

    if (!title || !description || !location || !salary || !company) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    try {
      const newJob = {
        title,
        description,
        location,
        salary,
        type: jobType,
        company,
      };

      const res = await axios.post('/jobs', newJob);
      if (res.status === 201) {
        setSuccess(true);
        // clear form
        setTitle('');
        setDescription('');
        setLocation('');
        setSalary('');
        setJobType('full-time');
        // if company was prefilled from user, leave it; otherwise clear it:
        if (!user?.company) setCompany('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <h2 className="text-2xl font-semibold mb-6">Create a New Job</h2>

      {success && (
        <div className="bg-green-100 text-green-800 p-4 rounded mb-4">
          Job created successfully!
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Job Title</label>
          <input
            type="text"
            placeholder="Senior Software Engineer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Description</label>
          <textarea
            placeholder="Design, develop, and maintain scalable web applications."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded h-24"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            placeholder="Karachi, Pakistan"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Salary</label>
          <input
            type="text"
            placeholder="120000"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="internship">Internship</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Company ID</label>
          <input
  type="text"
  placeholder="Acme Corp"
  value={company}
  onChange={e => setCompany(e.target.value)}
  className="w-full p-2 border rounded"
  required
/>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white py-2 rounded ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Creating Job...' : 'Create Job'}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
