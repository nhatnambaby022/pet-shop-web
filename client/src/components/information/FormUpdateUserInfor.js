import React from "react";
import { Link } from "react-router-dom";

const FormUpdateUserInfor = () => {
  return (
    <>
      <Link
        style={{ marginBottom: "12px", textDecoration: "underline" }}
        to='/information/password'>
        Đổi mật khẩu
      </Link>
      <form className='form-infor'>
        <h3>Cập nhật thông tin cá nhân</h3>
        <div>
          <p>Họ và tên</p>
          <input type='text' placeholder='Họ và tên' name='fullname' required />
        </div>
        <div>
          <p>Số điện thoại</p>
          <input
            type='text'
            placeholder='Số điện thoại'
            name='phone'
            pattern='0[1-9][0-9]{8}'
            required
          />
        </div>
        <div>
          <p>Email</p>
          <input type='email' placeholder='Email' name='email' required />
        </div>
        <div>
          <p>Địa chỉ</p>
          <textarea
            name='address'
            placeholder='Địa chỉ'
            cols='10'
            rows='5'
            required
            style={{ marginTop: "6px", width: "250px" }}
          />
        </div>
        <br />{" "}
        <button style={{ marginBottom: "24px" }} className='update-button'>
          Cập nhật thông tin
        </button>
      </form>
    </>
  );
};

export default FormUpdateUserInfor;
