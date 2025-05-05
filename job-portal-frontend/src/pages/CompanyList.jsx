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

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[30vh]">
        <p className="text-gray-500 text-lg">Loading companies...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-12 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 drop-shadow-sm">
          🏢 Top Companies
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {companies.map((company) => (
            <div
              key={company._id}
              className="bg-white/80 backdrop-blur-sm shadow-lg border border-white/40
                         rounded-xl p-6 transition-transform duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-1">
                {company.name}
              </h3>
              <p className="text-sm text-gray-500 mb-1">📍 {company.location}</p>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {company.description.slice(0, 100)}...
              </p>
              <Link
                to={`/company/${company._id}`}
                className="inline-block text-indigo-600 hover:text-indigo-800 text-sm font-medium underline transition-colors duration-150"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyList;
