import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext, ProductContext } from "../../contexts/contexts";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";
import { deleteCookie } from "../../common/cookieLib";
import CartMenu from "./CartMenu";

const Nav = () => {
  //Find product by name
  const { findProductByName } = useContext(ProductContext);
  const [stringToFind, setStringToFind] = useState("");

  const findProduct = async (e) => {
    e.preventDefault();
    try {
      const result = await findProductByName(stringToFind);
      return result.message;
    } catch (error) {
      return error;
    }
  };

  //Render Account
  let account;
  const {
    authState: { authLoading, isAuthenticated, user },
    loadUser,
  } = useContext(AuthContext);
  //Logout
  const logout = async () => {
    if (window.confirm("Bạn có chắc muốn đăng xuất?")) {
      deleteCookie("accessToken");
      await loadUser();
    }
  };
  if (authLoading) {
    account = (
      <>
        <BeatLoader loading={authLoading} />
      </>
    );
  } else if (isAuthenticated) {
    account = (
      <>
        <div className='Account'>
          <img className='avatar' src={require("../../assets/avt.png")} />
        </div>
        <div className='auth-links'>
          <Link to='/information' className='username'>
            {user.username}
          </Link>
          <button className='button-logout' onClick={logout}>
            Đăng xuất
          </button>
        </div>
      </>
    );
  } else {
    account = (
      <>
        <div className='auth-links'>
          <Link to='/login' className='auth-link'>
            Đăng nhập
          </Link>
          <Link to='/register' className='auth-link'>
            Đăng kí
          </Link>
        </div>
      </>
    );
  }
  //is admin
  let admin = <></>;
  if (isAuthenticated && user.username == "admin") {
    admin = (
      <Link to='/dashboard/users'>
        <button
          style={{
            height: "36px",
            width: "80px",
            borderRadius: "6px",
            position: "fixed",
            bottom: "12px",
            right: "12px",
            zIndex: 2000,
            backgroundColor: "green",
            color: "white",
            border: "1px solid white",
          }}>
          Dashboard
        </button>
      </Link>
    );
  } else {
    admin = <></>;
  }
  //render Nav
  return (
    <>
      {admin}
      <div className='nav'>
        <div className='logo'>
          <Link to='/'>
            <img className='logo-png' src={require("../../assets/logo.png")} />
          </Link>
        </div>
        <div className='find'>
          <form className='find-form' onSubmit={(e) => findProduct(e)}>
            <input
              type='text'
              className='input-find'
              placeholder='Tìm kiếm sản phẩm...'
              value={stringToFind}
              onChange={(e) => {
                setStringToFind(e.target.value);
              }}
            />
            <button type='submit' className='btn-find'>
              <img
                className='find-icon'
                src={require("../../assets/find-icon.png")}
              />
            </button>
          </form>
        </div>
        <div className='cart'>
          <img
            className='cart-icon'
            src={require("../../assets/cart-icon.png")}
          />
          <CartMenu button={true} className='cart-dropdown' />
        </div>
        {account}
      </div>
    </>
  );
};
export default Nav;
