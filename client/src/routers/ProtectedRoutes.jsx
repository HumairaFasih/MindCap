import React, { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/LoadingScreen';

function ProtectedRoutes() {
  const {
    auth: { isAuthenticated },
  } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : isAuthenticated === false ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <Loading />
  );
}
export default ProtectedRoutes;
