import React, { useContext } from "react";
import { CartContext } from "../../contexts/contexts";
import CartMenu from "../header-footer/CartMenu";
import Footer from "../header-footer/Footer";
import Nav from "../header-footer/Nav";
import OrderForm from "./OrderForm";

const Order = () => {
  const {
    cartState: { items },
  } = useContext(CartContext);
  let orderForm = <></>;
  if (items.length == 0) {
    orderForm = <></>;
  } else {
    orderForm = <OrderForm />;
  }
  return (
    <div style={{}}>
      <Nav />
      <div
        style={{
          paddingTop: "78px",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
        className='container'>
        <CartMenu button={false} className='cart-order' />
        {orderForm}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
