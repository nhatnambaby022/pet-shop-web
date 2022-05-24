import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../contexts/contexts";

const FormInforLogin = () => {
  const { changePassword } = useContext(AuthContext);
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    newPassword: "",
    reNewPassword: "",
  });
  const { addToast } = useToasts();
  const { password, newPassword, reNewPassword } = passwordForm;
  const onChangePasswordForm = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };
  const submitChangePassword = async (e) => {
    e.preventDefault();
    if (password == newPassword) {
      addToast("Mật khẩu mới phải khác mật khẩu hiện tại", {
        appearance: "warning",
      });
    } else {
      if (newPassword == reNewPassword) {
        const update = await changePassword(password, newPassword);
        if (update.success) {
          setPasswordForm({
            password: "",
            newPassword: "",
            reNewPassword: "",
          });
          addToast("Đổi mật khấu thành công", { appearance: "success" });
        } else {
          addToast(update.message, { appearance: "error" });
        }
      } else {
        addToast("Nhập lại mật khẩu không đúng", { appearance: "warning" });
      }
    }
  };
  return (
    <>
      <Link
        style={{ marginBottom: "12px", textDecoration: "underline" }}
        to='/information'>
        Cập nhập thông tin cá nhân
      </Link>
      <form className='form-infor' onSubmit={submitChangePassword}>
        <h3>Đổi mật khẩu</h3>
        <div>
          <p>Mật khẩu hiện tại</p>
          <input
            type='password'
            placeholder='Mật khẩu cũ'
            name='password'
            required
            value={password}
            onChange={onChangePasswordForm}
          />
        </div>
        <div>
          <p>Mật khẩu mới</p>
          <input
            type='password'
            placeholder='Mật khẩu mới '
            name='newPassword'
            required
            value={newPassword}
            onChange={onChangePasswordForm}
          />
        </div>
        <div>
          <p>Nhập lại mật khẩu</p>
          <input
            type='password'
            placeholder='Nhập lại mật khẩu mới'
            name='reNewPassword'
            required
            value={reNewPassword}
            onChange={onChangePasswordForm}
          />
        </div>
        <br />{" "}
        <button
          type='submit'
          style={{ marginBottom: "24px" }}
          className='update-button'>
          Đổi mật khẩu
        </button>
      </form>
    </>
  );
};

export default FormInforLogin;
