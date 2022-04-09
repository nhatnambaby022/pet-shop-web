import axios from "axios";

const setAuthTokenDefault = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Beere ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthTokenDefault;
