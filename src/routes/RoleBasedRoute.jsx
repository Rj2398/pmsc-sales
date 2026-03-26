import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleBasedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/" />;
  if (!allowedRoles.includes(user?.role)) return <Navigate to="/" />;

  return <Outlet />;
};

export default RoleBasedRoute;
