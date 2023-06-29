import { useContext } from "react";
import { Navigate, useLocation } from 'react-router-dom'
import { AuthContext } from "../context/authProvider";
import { getAccessTokenCookie } from "../authUtils";

export function RequireAuth({ children }: any) {
    const { setAuth, auth } = useContext(AuthContext);
    const location = useLocation();

    console.log('req auth', auth);

    // This has auth, but nothing is being stored so when I refresh I am returned to login
    // The endless loop could be from this as well.
  
    return getAccessTokenCookie() ? (
      children
    ) : (
      <Navigate to="/admin" replace state={{ path: location.pathname }} />
    );
  }
  