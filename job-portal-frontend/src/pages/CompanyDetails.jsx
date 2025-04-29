import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const CompanyDetails = () => {
  const { id } = useParams();  // Extract 'id' from URL
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

  if (error) return <p>{error}</p>;
  if (!company) return <p>Loading company details...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-4">{company.name}</h2>
      <p className="text-gray-600 mb-2"><strong>Location:</strong> {company.location}</p>
      <p className="text-gray-600 mb-2"><strong>Website:</strong> <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{company.website}</a></p>
      <p className="text-gray-700 mt-4">{company.description}</p>
    </div>
  );
};

export default CompanyDetails;
