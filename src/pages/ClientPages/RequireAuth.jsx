import { useLocation,Navigate, Outlet} from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useAuthStore from '../../store/AuthStore';

    const RequireAuth = ({ allowedRoles }) => {
      const { auth } = useAuth();
      const location = useLocation();
      const userRole = auth?.role_id;

      // Check if the user's role matches any of the allowed roles
      const isAllowed = allowedRoles?.includes(userRole);
  
      return (
          isAllowed ? (
              <Outlet />
          ) : (
              auth?.remember_token ? (
                  <Navigate to={{ pathname: '/unauthorized', state: { from: location } }} replace />
              ) : (
                  <Navigate to={{ pathname: '/login', state: { from: location } }} replace />
              )
          )
      );
    }
    export default RequireAuth;
