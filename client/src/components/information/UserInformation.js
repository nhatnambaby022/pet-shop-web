import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../header-footer/Nav";
import FormUpdateUserInfor from "./FormUpdateUserInfor";

const UserInformation = () => {
  return (
    <div>
      <Nav />
      <div style={{ paddingTop: "78px" }} className='container'>
        <Outlet />
      </div>
    </div>
  );
};

export default UserInformation;
