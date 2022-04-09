import { Link } from "react-router-dom";
const RegisterForm = () => {
  return (
    <div className="auth-component">
      <div className="RegisterForm">
        <h2>Register</h2>
        <input type="text" placeholder="Username" name="username" required />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          name="password"
          required
        />
        <button type="submit" className="btn-submit">
          Register
        </button>
        <p>
          Already an account?
          <Link to="/login">
            <span> Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
