import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-6 space-y-6">
      <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

      <Link to="/admin" className="hover:text-gray-300">Dashboard</Link>
      <Link to="/admin/users" className="hover:text-gray-300">Manage Users</Link>
      <Link to="/admin/companies" className="hover:text-gray-300">Manage Companies</Link>
      <Link to="/admin/jobs" className="hover:text-gray-300">Manage Jobs</Link>
      <Link to="/admin/applications" className="hover:text-gray-300">Manage Applications</Link>
    </div>
  );
};

export default AdminSidebar;
