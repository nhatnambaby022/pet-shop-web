import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/contexts";
import Nav from "../header-footer/Nav";
const RegisterForm = () => {
  const { registerUser } = useContext(AuthContext);

  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    cf_password: "",
  });
  const [message, setMessage] = useState(<></>);
  const { username, password, cf_password } = registerForm;

  const onChangRegisterForm = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };
  const register = async (e) => {
    e.preventDefault();
    try {
      if (password === cf_password) {
        const registerData = await registerUser({ username, password });
        if (!registerData.success) {
          setMessage(<p style={{ color: "red" }}>{registerData.message}</p>);
          setTimeout(() => setMessage(null), 5000);
        } else {
          window.alert("Create Account Success! Please login");
          window.location = "/login";
        }
      } else {
        setMessage(<p style={{ color: "red" }}>Confirm password incorrect!</p>);
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Nav />
      <div className='auth-component'>
        <form className='RegisterForm' onSubmit={register}>
          {message}
          <h2>Đăng kí tài khoản</h2>
          <input
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangRegisterForm}
          />
          <input
            type='password'
            placeholder='Password'
            name='password'
            required
            value={password}
            onChange={onChangRegisterForm}
          />
          <input
            type='password'
            placeholder='Confirm password'
            name='cf_password'
            required
            value={cf_password}
            onChange={onChangRegisterForm}
          />
          <button type='submit' className='btn-submit'>
            Đăng kí
          </button>
          <p>
            Đã có tài khoản?
            <Link to='/login'>
              {" "}
              <span style={{ textDecoration: "underline" }}>Đăng nhập</span>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
