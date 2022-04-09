import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const { username, password } = { loginForm };

  const onChangLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = loginUser(loginForm);
      console.log(loginData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-component">
      <form className="LoginForm" onSubmit={login}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          required
          onChange={onChangLoginForm}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          required
          onChange={onChangLoginForm}
        />
        <button type="submit" className="btn-submit">
          Login
        </button>
        <p>
          Don't have an account?
          <Link to="/register">
            <span> Register</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
