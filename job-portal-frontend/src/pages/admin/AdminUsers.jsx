import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminSidebar from '../../components/AdminSidebar';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get('/admin/users');
      setUsers(data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">All Users</h1>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="p-2 border">{u.name}</td>
                <td className="p-2 border">{u.email}</td>
                <td className="p-2 border">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
