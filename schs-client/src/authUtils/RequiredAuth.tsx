import { Navigate, useLocation } from 'react-router-dom'
// import { AuthContext } from "../context/authProvider";
import { getAccessTokenCookie } from ".";

export function RequireAuth({ children }: any) {
    const location = useLocation();

    // This has auth, but nothing is being stored so when I refresh I am returned to login
    // The endless loop could be from this as well.
  
    return getAccessTokenCookie() ? (
      children
    ) : (
      <Navigate to="/login" replace state={{ path: location.pathname }} />
    );
  }
  