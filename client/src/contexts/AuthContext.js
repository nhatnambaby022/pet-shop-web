import { useReducer, useEffect } from "react";
import axios from "axios";
import { AuthReducer } from "../producers/AuthReducer";
import { apiUrl } from "./constants";
import { getCookie } from "../common/cookieLib";
import setAuthTokenDefault from "../utils/setAuthToken";

import { AuthContext } from "./contexts";
import { useToasts } from "react-toast-notifications";

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });
  //addToast
  const { addToast } = useToasts();

  //change password
  const changePassword = async (password, newPassword) => {
    try {
      if (!password || !newPassword) {
        return { success: false, message: "Vui lòng điền đầy đủ thông tin!" };
      } else {
        const response = await axios.put(`${apiUrl}/users/password`, {
          password,
          newPassword,
        });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      return { success: false, message: error };
    }
  };
  //update userinfor
  const updateUser = async (userInfor) => {
    const { fullname, phone, email, address } = userInfor;
    try {
      if (!fullname || !phone || !email || !address) {
        return { success: false, message: "One or more is empty." };
      } else {
        const response = await axios.put(`${apiUrl}/users`, {
          fullname,
          phone,
          email,
          address,
        });
        if (response.data.success) {
          addToast("Cập nhật thông tin thành công", { appearance: "success" });
          return response.data;
        }
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      return { success: false, message: error };
    }
  };

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

  const authContextData = {
    loginUser,
    loadUser,
    authState,
    registerUser,
    updateUser,
    changePassword,
  };
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
