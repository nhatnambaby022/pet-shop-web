import React from "react";
import { Link } from "react-router-dom";

const FormInforLogin = () => {
  return (
    <>
      <Link
        style={{ marginBottom: "12px", textDecoration: "underline" }}
        to='/information'>
        Cập nhập thông tin cá nhân
      </Link>
      <form className='form-infor'>
        <h3>Đổi mật khẩu</h3>
        <div>
          <p>
            username:
            <span
              style={{
                fontSize: "16px",
                fontStyle: "normal",
                fontWeight: "500",
              }}>
              namele
            </span>
          </p>
        </div>
        <div>
          <p>Mật khẩu</p>
          <input
            type='password'
            placeholder='Mật khẩu'
            name='password'
            required
          />
        </div>
        <div>
          <p>Nhập lại mật khẩu</p>
          <input
            type='password'
            placeholder='Nhập lại mật khẩu'
            name='email'
            required
          />
        </div>
        <br />{" "}
        <button style={{ marginBottom: "24px" }} className='update-button'>
          Đổi mật khẩu
        </button>
      </form>
    </>
  );
};

export default FormInforLogin;
