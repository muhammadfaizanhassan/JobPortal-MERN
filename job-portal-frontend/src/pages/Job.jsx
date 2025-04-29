import React, { useEffect, useState, useCallback } from 'react';
import axios from '../utils/axios';
import JobList from '../components/JobList';

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Fetch jobs from the server
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
  }, [search]); // Add search as a dependency since it's used inside fetchJobs

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]); // Dependency array includes fetchJobs to avoid the warning

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchJobs();
  };

  return (
    <div className="container mx-auto px-6 py-10">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Search by title or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 focus:border-blue-500 outline-none p-3 rounded-lg w-full sm:w-2/3 lg:w-1/3 shadow-md transition-all duration-200 ease-in-out"
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-200 ease-in-out focus:outline-none">
          Search
        </button>
      </form>

      {/* Loading Indicator */}
      {loading ? (
        <div className="text-center text-xl text-gray-500">
          <div className="spinner-border animate-spin h-8 w-8 border-t-4 border-blue-600 rounded-full"></div>
          <p>Loading job details...</p>
        </div>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
};

export default Job;