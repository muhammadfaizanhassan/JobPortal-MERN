import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

/**
 * @param {string|string[]} allowed - Allowed role(s) or 'admin'
 */
const ProtectedRoute = ({ children, allowed }) => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowed) {
    const roles = Array.isArray(allowed) ? allowed : [allowed];

    const isAllowed =
      (roles.includes('admin') && user.isAdmin) ||
      roles.includes(user.role);

    if (!isAllowed) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
