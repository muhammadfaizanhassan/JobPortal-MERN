import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const CompanyDetails = () => {
  const { id } = useParams();
  const [company, setCompany] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const { data } = await axios.get(`/companies/${id}`);
        setCompany(data);
      } catch (error) {
        console.error('Error fetching company details:', error);
        setError('Failed to fetch company details');
      }
    };

    fetchCompany();
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <p className="text-red-600 text-lg font-medium">{error}</p>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <p className="text-gray-500 text-lg">Loading company details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-50 via-white to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 transition-all duration-300">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">{company.name}</h2>

        <div className="space-y-4 text-gray-700 text-base">
          <p>
            <span className="font-semibold">📍 Location:</span> {company.location}
          </p>
          <p>
            <span className="font-semibold">🌐 Website:</span>{' '}
            <a
              href={company.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 underline transition-colors"
            >
              {company.website}
            </a>
          </p>
        </div>

        <p className="mt-6 text-gray-700 leading-relaxed">{company.description}</p>
      </div>
    </div>
  );
};

export default CompanyDetails;
