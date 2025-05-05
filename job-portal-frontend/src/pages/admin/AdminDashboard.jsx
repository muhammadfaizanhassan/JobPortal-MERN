import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    jobs: 0,
    companies: 0,
    applications: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, jobsRes, companiesRes, applicationsRes] = await Promise.all([
          axios.get('/admin/users'),
          axios.get('/admin/jobs'),
          axios.get('/admin/companies'),
          axios.get('/admin/applications'),
        ]);

        setStats({
          users: usersRes.data.length,
          jobs: jobsRes.data.length,
          companies: companiesRes.data.length,
          applications: applicationsRes.data.length,
        });
      } catch (error) {
        console.error('Error fetching admin stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Users Card */}
          <div className="bg-blue-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Total Users</h2>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>

          {/* Companies Card */}
          <div className="bg-green-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Total Companies</h2>
            <p className="text-3xl font-bold">{stats.companies}</p>
          </div>

          {/* Jobs Card */}
          <div className="bg-yellow-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Total Jobs</h2>
            <p className="text-3xl font-bold">{stats.jobs}</p>
          </div>

          {/* Applications Card */}
          <div className="bg-purple-100 p-6 rounded-lg shadow text-center">
            <h2 className="text-xl font-semibold mb-2">Total Applications</h2>
            <p className="text-3xl font-bold">{stats.applications}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
