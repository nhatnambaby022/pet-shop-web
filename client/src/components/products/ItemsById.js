import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "../header-footer/Nav";

const ItemsById = () => {
  return (
    <>
      <Nav />
      <div className='div-dog'>
        <img src={require("../../assets/dog.png")} className='img-dog' />
      </div>
      <hr />
      <Outlet />
    </>
  );
};

export default ItemsById;
