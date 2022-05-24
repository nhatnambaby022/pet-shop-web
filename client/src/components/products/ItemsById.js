import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../header-footer/Footer";
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
      <Footer />
    </>
  );
};

export default ItemsById;
