import React from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <p>Welcome, Admin! Choose a section from the sidebar.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
