import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const { data } = await axios.get(`/jobs/${id}`);
        setJob(data);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Could not fetch job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center text-xl text-gray-500 mt-16">Loading job details...</p>;
  }

  if (error) {
    return <p className="text-center text-xl text-red-600 mt-16">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-purple-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{job.title}</h2>
        <p className="text-gray-700 text-lg mb-6">{job.description}</p>

        <div className="space-y-3 text-gray-700 text-base">
          <p>
            <span className="font-semibold">📍 Location:</span> {job.location}
          </p>
          <p>
            <span className="font-semibold">💰 Salary:</span> ${job.salary}
          </p>
          <p>
            <span className="font-semibold">🧑‍💼 Posted by:</span> {job.postedBy?.name}
          </p>
          <p>
            <span className="font-semibold">🏢 Company:</span> {job.company}
          </p>
        </div>

        {job && job.postedBy && job.postedBy.role !== 'recruiter' && (
          <div className="mt-8">
            <button
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-lg font-semibold shadow-lg transform hover:scale-[1.02] transition duration-150"
            >
              Apply Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetails;
