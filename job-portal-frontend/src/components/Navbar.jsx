import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const isAdmin = user?.isAdmin === true;


  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const handleMenuClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="text-xl font-bold text-blue-600">
          JobPortal
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/job" className="text-gray-700 hover:text-blue-600">Jobs</Link>
          <Link to="/companies" className="text-gray-700 hover:text-blue-600">Companies</Link>

          {user?.role === 'recruiter' && (
            <Link to="/create-job" className="text-gray-700 hover:text-blue-600">Post Job</Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin</Link>
          )}

          {user ? (
            <>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
              <span className="text-gray-500 ml-2">Hi, {user.name?.split(' ')[0]}</span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-blue-600">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white px-4 pb-4 flex flex-col gap-2">
          <Link to="/" onClick={handleMenuClick} className="py-2 text-gray-700">Home</Link>
          <Link to="/job" onClick={handleMenuClick} className="py-2 text-gray-700">Jobs</Link>
          <Link to="/companies" onClick={handleMenuClick} className="py-2 text-gray-700">Companies</Link>

          {user?.role === 'recruiter' && (
            <Link to="/create-job" onClick={handleMenuClick} className="py-2 text-gray-700">
              Post Job
            </Link>
          )}

{isAdmin && (
  <Link to="/admin" onClick={handleMenuClick} className="py-2 text-gray-700 hover:text-indigo-600 transition">
    Admin
  </Link>
)}


          {user ? (
            <>
              <Link to="/profile" onClick={handleMenuClick} className="py-2 text-gray-700">Profile</Link>
              <button onClick={handleLogout} className="text-left py-2 text-red-500">Logout</button>
              <p className="text-gray-500 text-sm">Hi, {user.name?.split(' ')[0]}</p>
            </>
          ) : (
            <>
              <Link to="/login" onClick={handleMenuClick} className="py-2 text-gray-700">Login</Link>
              <Link to="/register" onClick={handleMenuClick} className="py-2 text-gray-700">Register</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;