import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/contexts";

const ProtectedAdmin = () => {
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);
  if (authLoading) {
    return <h3>Loading....</h3>;
  } else {
    return isAuthenticated && user.username == "admin" ? (
      <Outlet />
    ) : (
      <Navigate to='/' />
    );
  }
};

export default ProtectedAdmin;
