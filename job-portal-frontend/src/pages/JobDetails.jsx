import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';  // Import useParams hook

const JobDetails = () => {
  const { id } = useParams();  // Use the hook to get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`/jobs/${id}`);  // Use id from useParams
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Could not fetch job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);  // Adding 'id' to the dependency array ensures it refetches if id changes

  if (loading) return <p className="text-center text-xl text-gray-500">Loading job details...</p>;

  if (error) return <p className="text-center text-xl text-red-600">{error}</p>;

  return (
    <div className="container mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold text-gray-800">{job.title}</h2>
      <p className="text-gray-600 mt-4">{job.description}</p>
      <div className="mt-6">
        <p className="text-lg text-gray-700"><strong>Location:</strong> {job.location}</p>
        <p className="text-lg text-gray-700"><strong>Salary:</strong> ${job.salary}</p>
        <p className="text-lg text-gray-700"><strong>Posted by:</strong> {job.postedBy?.name}</p>
        <p className="text-lg text-gray-700"><strong>Company:</strong> {job.company}</p>
      </div>

      {/* If you want to allow job seekers to apply */}
      {job && job.postedBy && job.postedBy.role !== 'recruiter' && (
        <div className="mt-6">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none">
            Apply Now
          </button>
        </div>
      )}
    </div>
  );
};

export default JobDetails;
