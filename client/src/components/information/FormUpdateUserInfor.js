import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/contexts";
import { useToasts } from "react-toast-notifications";

const FormUpdateUserInfor = () => {
  const {
    authState: { user },
    updateUser,
    loadUser,
  } = useContext(AuthContext);
  const [button, setButton] = useState(<></>);
  const [userInfor, setUserInfor] = useState({ ...user });
  const { fullname, phone, email, address } = userInfor;
  const { addToast } = useToasts();
  const onChangInfor = (event) => {
    setButton(
      <button style={{ marginBottom: "24px" }} className='update-button'>
        Cập nhật thông tin
      </button>
    );
    setUserInfor({ ...userInfor, [event.target.name]: event.target.value });
  };
  const UpdateUserInfor = async (event) => {
    event.preventDefault();
    if (!fullname || !phone || !email || !address) {
      addToast("Vui lòng điền đầy đủ thông tin!", { appearance: "warning" });
    } else {
      await updateUser(userInfor);
      await loadUser();
      setButton(<></>);
    }
  };
  return (
    <>
      <Link
        style={{ marginBottom: "12px", textDecoration: "underline" }}
        to='/information/password'>
        Đổi mật khẩu
      </Link>
      <form className='form-infor' onSubmit={UpdateUserInfor}>
        <h3>Cập nhật thông tin cá nhân</h3>
        <div>
          <p>Họ và tên</p>
          <input
            type='text'
            placeholder='Họ và tên'
            name='fullname'
            required
            onChange={onChangInfor}
            value={fullname}
          />
        </div>
        <div>
          <p>Số điện thoại</p>
          <input
            type='text'
            placeholder='Số điện thoại'
            name='phone'
            pattern='0[1-9][0-9]{8}'
            required
            onChange={onChangInfor}
            value={phone}
          />
        </div>
        <div>
          <p>Email</p>
          <input
            type='email'
            placeholder='Email'
            name='email'
            required
            onChange={onChangInfor}
            value={email}
          />
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
            onChange={onChangInfor}
            value={address}
          />
        </div>
        <br /> {button}
      </form>
    </>
  );
};

export default FormUpdateUserInfor;
