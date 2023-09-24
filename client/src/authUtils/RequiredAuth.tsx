import {useAuth} from '../helpers/hooks/useAuth'
import { Navigate, Outlet, useLocation } from 'react-router';

export const RequiredAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('requiredAuth', auth)

  return (
    auth?.roles?.find(role => allowedRoles?.includes(role))
      ? <Outlet />
      : auth?.username
        ? <Navigate to={'/unauthorized'} state={{ from: location }} replace />
        : <Navigate to={'/login'} state={{ from: location }} replace />
  );
}
  