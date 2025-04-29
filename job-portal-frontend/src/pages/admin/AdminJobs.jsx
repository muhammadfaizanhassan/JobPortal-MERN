import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminSidebar from '../../components/AdminSidebar';

const AdminJobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const { data } = await axios.get('/admin/jobs');
      setJobs(data);
    };
    fetchJobs();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">All Jobs</h1>

        <ul>
          {jobs.map((job) => (
            <li key={job._id} className="p-2 border-b">{job.title} - {job.company}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminJobs;
