import React, { useEffect, useState, useCallback } from 'react';
import axios from '../utils/axios';
import JobList from '../components/JobList';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get('/jobs', {
        params: search ? { search } : {},
      });
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchJobs();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          className="mb-10 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="text"
            placeholder="Search by job title or location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-2/3 lg:w-1/2 px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none transition-all duration-200"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all duration-200"
          >
            Search
          </button>
        </form>

        {/* Loading Indicator */}
        {loading ? (
          <div className="flex flex-col items-center gap-3 mt-20">
            <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-600 text-lg">Loading job details...</p>
          </div>
        ) : (
          <JobList jobs={jobs} />
        )}
      </div>
    </div>
  );
};

export default Job;
