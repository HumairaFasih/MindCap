import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectedRoutes() {
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  useEffect(() => {
    console.log(`logging auth: ${isAuthenticated}`);
  }, [isAuthenticated]);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoutes;
