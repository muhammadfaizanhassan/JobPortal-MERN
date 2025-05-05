import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-red-50 via-white to-blue-100 px-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-6xl font-extrabold text-red-600 mb-4">403</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          Sorry, you do not have permission to view this page.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium shadow hover:bg-indigo-700 hover:scale-105 transition-all duration-200"
        >
          ⬅️ Go Back
        </button>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
