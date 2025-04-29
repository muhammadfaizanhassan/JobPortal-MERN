import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import AdminSidebar from '../../components/AdminSidebar';

const AdminCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data } = await axios.get('/admin/companies');
      setCompanies(data);
    };
    fetchCompanies();
  }, []);

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="p-6 w-full">
        <h1 className="text-2xl font-bold mb-6">All Companies</h1>

        <ul>
          {companies.map((c) => (
            <li key={c._id} className="p-2 border-b">{c.name} - {c.location}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminCompanies;
