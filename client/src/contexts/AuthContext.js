import { useReducer, useEffect } from "react";
import axios from "axios";
import { AuthReducer } from "../producers/AuthReducer";
import { apiUrl } from "./constants";
import { getCookie } from "../common/cookieLib";
import setAuthTokenDefault from "../utils/setAuthToken";

import { AuthContext } from "./contexts";

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  //Check Authenticated and get User
  const loadUser = async () => {
    const token = getCookie("accessToken");
    if (token) {
      setAuthTokenDefault(token);
      try {
        const response = await axios.get(`${apiUrl}/auth`);
        const user = response.data.user;
        if (response.data.success) {
          dispatch({
            type: "SET_AUTH",
            payload: { isAuthenticated: true, user: user },
          });
        }
      } catch (error) {}
    } else {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      await loadUser();
    }
    fetchData();
  }, []);

  //Login
  const loginUser = async (loginForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, loginForm);
      document.cookie = response.data.cookie;
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else {
        return { success: false, message: error.messages };
      }
    }
  };

  const registerUser = async (registerForm) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/register`,
        registerForm
      );
      if (response.data.success) return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: error };
    }
  };

  const authContextData = { loginUser, loadUser, authState, registerUser };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
