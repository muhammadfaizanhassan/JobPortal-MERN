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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }, // Add token
      });
      alert('Applied successfully!');
    } catch (error) {
      alert('Failed to apply');
    }
  };

  if (loading) return <p>Loading jobs...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-semibold">Job Listings</h2>

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job._id} className="bg-white shadow-md p-4 rounded-md">
              <h3 className="text-xl font-bold">{job.title}</h3>
              <p>{job.description}</p>
              <p className="text-gray-500">Location: {job.location}</p>
              <p className="text-green-600">Salary: {job.salary}</p>

              {/* Apply button for job seekers */}
              <button
                onClick={() => applyForJob(job._id)}
                className="bg-blue-600 text-white p-2 rounded mt-2"
              >
                Apply
              </button>

              {/* Link to job details */}
              <Link to={`/jobs/${job._id}`} className="text-blue-500">View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobList;
