import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import JobList from '../components/JobList';

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get('/jobs');
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-md sm:text-5xl">
          🚀 Explore the Latest Job Opportunities
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          Apply to top companies hiring now — built with <span className="font-medium text-indigo-600">MERN</span> & <span className="font-medium text-indigo-600">TailwindCSS</span>.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center mt-20">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent border-solid rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-md p-6 max-w-5xl mx-auto">
          <JobList jobs={jobs} />
        </div>
      )}
    </div>
  );
};

export default Home;
