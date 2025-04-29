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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-800 drop-shadow-sm sm:text-5xl">
          🚀 Explore the Latest Job Opportunities
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Apply to top companies hiring now — built with MERN & TailwindCSS.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="w-16 h-16 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <JobList jobs={jobs} />
      )}
    </div>
  );
};

export default Home;
