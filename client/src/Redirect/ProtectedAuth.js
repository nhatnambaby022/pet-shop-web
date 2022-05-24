import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";

const ProtectedAuth = () => {
  const { authState } = useContext(AuthContext);
  if (authState.authLoading) {
    return <h3>Loading...</h3>;
  } else {
    return authState.isAuthenticated ? <Outlet /> : <Navigate to='/' />;
  }
};

export default ProtectedAuth;
