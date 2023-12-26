import { useLocation,Navigate, Outlet} from 'react-router-dom';
import useAuth from '../hooks/useAuth';


    const RequireAuth = ({ allowedRoles }) => {
      const { auth } = useAuth();
      const location = useLocation();


      return (
        auth?.role_id
        ? (
        allowedRoles.some(role => role === auth.role_id)
          ? <Outlet />
          : auth.user
            ? <Navigate to="/unauthorized" state={{from: location }} replace />
            : <Navigate to="/login" state={{ from: location }} replace />
          )
        : <Navigate to="/login" state={{from: location }} replace />
      );
    }
    export default RequireAuth;
