import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminSidebar from '../../components/AdminSidebar';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data } = await axios.get('/admin/applications');
      setApplications(data);
    };
    fetchApplications();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">All Applications</h1>

        <ul>
          {applications.map((app) => (
            <li key={app._id} className="p-2 border-b">
              Applicant ID: {app.applicant} applied to Job ID: {app.job} — Status: {app.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminApplications;
