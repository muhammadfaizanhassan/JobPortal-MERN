// pages/CompanyList.jsx
import React, { useEffect, useState } from "react";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axios.get("/companies");
        setCompanies(data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading companies...</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold mb-6 text-center">Companies</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div key={company._id} className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{company.name}</h3>
            <p className="text-gray-600 mb-2">{company.location}</p>
            <p className="text-gray-500 mb-4">
              {company.description.slice(0, 100)}...
            </p>
            <Link
              to={`/company/${company._id}`}
              className="text-blue-600 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyList;
