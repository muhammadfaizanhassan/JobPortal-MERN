import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { Link } from 'react-router-dom';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('/jobs');
        setJobs(response.data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const applyForJob = async (jobId) => {
    try {
      await axios.post(`/application/apply/${jobId}`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Applied successfully!');
    } catch (error) {
      alert('Failed to apply');
    }
  };

  if (loading) return <p className="text-center text-lg text-gray-600 mt-10">Loading jobs...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Available Jobs</h2>

      {jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{job.title}</h3>
              <p className="text-gray-700 mb-2">{job.description}</p>
              <p className="text-sm text-gray-500 mb-1">📍 Location: {job.location}</p>
              <p className="text-sm text-green-600 font-medium mb-4">💰 Salary: {job.salary}</p>

              <button
                onClick={() => applyForJob(job._id)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-150 mb-3"
              >
                Apply
              </button>

              <Link
                to={`/jobs/${job._id}`}
                className="block text-center text-indigo-500 hover:underline text-sm"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
