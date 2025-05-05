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
        setTitle('');
        setDescription('');
        setLocation('');
        setSalary('');
        setJobType('full-time');
        if (!user?.company) setCompany('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-white to-purple-100 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📋 Create a New Job</h2>

        {success && (
          <div className="bg-green-100 text-green-800 border border-green-300 rounded p-4 mb-4 text-sm font-medium">
            ✅ Job created successfully!
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-800 border border-red-300 rounded p-4 mb-4 text-sm font-medium">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <input
              type="text"
              placeholder="Senior Software Engineer"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Description</label>
            <textarea
              placeholder="Design, develop, and maintain scalable web applications."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 h-28 rounded-lg border border-gray-300 shadow-sm resize-none focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              type="text"
              placeholder="Karachi, Pakistan"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <input
              type="text"
              placeholder="120000"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
            <select
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm bg-white focus:ring-2 focus:ring-indigo-300 focus:outline-none"
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="internship">Internship</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              placeholder="Acme Corp"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-300 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition duration-200 ${
              loading
                ? 'bg-indigo-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95'
            }`}
          >
            {loading ? 'Creating Job...' : 'Create Job'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
