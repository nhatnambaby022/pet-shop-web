import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useFetch } from "react-async";
import { getCookie } from "../common/cookieLib";
import axios from "axios";
import { apiUrl } from "../contexts/constants";
import setAuthTokenDefault from "../utils/setAuthToken";
import { AuthContext } from "../contexts/contexts";

const ProtectedAuth = () => {
  const { authState } = useContext(AuthContext);
  return authState.isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

export default ProtectedAuth;
