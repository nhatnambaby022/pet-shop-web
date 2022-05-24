import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/contexts";
import Nav from "../header-footer/Nav";
import Footer from "../header-footer/Footer";

const LoginForm = () => {
  //Context
  const { loginUser } = useContext(AuthContext);

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState(<></>);
  const { username, password } = { loginForm };

  const onChangLoginForm = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      if (!loginData.success) {
        setMessage(<p style={{ color: "red" }}>{loginData.message}</p>);
        setTimeout(() => setMessage(null), 5000);
      } else {
        window.location = "/";
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Nav />
      <div className='auth-component'>
        <form className='LoginForm' onSubmit={login}>
          {message}
          <h2>Đăng nhập</h2>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            required
            onChange={onChangLoginForm}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            required
            onChange={onChangLoginForm}
          />
          <button type='submit' className='btn-submit'>
            Đăng nhập
          </button>
          <p>
            Không có tài khoản?
            <Link to='/register'>
              {" "}
              <span style={{ textDecoration: "underline" }}>Đăng kí</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
