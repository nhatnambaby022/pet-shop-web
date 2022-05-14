import React from "react";
import CartMenu from "../header-footer/CartMenu";
import Nav from "../header-footer/Nav";

const Order = () => {
  return (
    <div>
      <Nav />
      <div style={{ paddingTop: "78px" }} className='container'>
        <CartMenu button={false} className='cart-order' />
      </div>
    </div>
  );
};

export default Order;
