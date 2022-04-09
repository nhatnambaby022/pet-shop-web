import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { BeatLoader } from "react-spinners";

const Nav = () => {

  //Render Account
  let account;
  const {
    authState: { authLoading, isAuthenticated, user },
  } = useContext(AuthContext);
  console.log(isAuthenticated);
  if (authLoading) {
    account = (
      <>
        <BeatLoader loading={authLoading} />
      </>
    );
  } else if (isAuthenticated) {
    account = (
      <div className="Account">
        <img className="avatar" src="" />
        <p className="name">{user.username}</p>
      </div>
    );
  } else {
    account = (
      <div className="Account">
        <img className="avatar" src={require("../../assets/avt-default.png")} />
        <p className="name"></p>
      </div>
    );
  }
  return (
    <div className="nav">
      <div className="logo">
        <Link to="/">
          <img className="logo-png" src={require("../../assets/logo.png")} />
        </Link>
      </div>
      <div className="find">
        <form className="find-form">
          <input type="text" className="input-find" placeholder="Tìm kiếm sản phẩm..." />
          <button type="submit" className="btn-find">
            <img className="find-icon" src={require("../../assets/find-icon.png")} />
          </button>
        </form>
      </div>
      <div className="cart">
        <img className="cart-icon" src={require("../../assets/cart-icon.png")}/>
      </div>
      {account}
    </div>
  );
};
export default Nav;
