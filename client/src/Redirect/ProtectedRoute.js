import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";

const ProtectedRoute = () => {
  const {
    authState: { isAuthenticated },
  } = useContext(AuthContext);
  return isAuthenticated ? <Navigate to='/' /> : <Outlet />;
};

export default ProtectedRoute;
