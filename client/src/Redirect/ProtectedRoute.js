import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  if (authLoading) {
    return <h3>Loading...</h3>;
  } else {
    return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
  }
};

export default ProtectedRoute;
