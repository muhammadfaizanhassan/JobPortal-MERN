// components/JobCard.js
import { Link } from 'react-router-dom';
import axios from '../utils/axios';  // Import axios for making API requests

const JobCard = ({ job }) => {
  const handleApply = async () => {
    try {
      await axios.post(`/applications/apply/${job._id}`);  // Apply for the job
      alert('Successfully applied to the job!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error applying to the job');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
      <h2 className="text-xl font-semibold text-gray-800">
        <Link to={`/jobs/${job._id}`} className="hover:text-blue-600">
          {job.title}
        </Link>
      </h2>
      <p className="text-gray-600 mt-2">{job.company}</p>
      <p className="text-gray-500 text-sm">{job.location}</p>
      <p className="mt-3 text-gray-700">{job.description}</p>
      <p className="mt-2 font-medium text-green-600">${job.salary}</p>
      
      {/* Apply Button */}
      <button
        onClick={handleApply}
        className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Apply
      </button>
    </div>
  );
};

export default JobCard;
