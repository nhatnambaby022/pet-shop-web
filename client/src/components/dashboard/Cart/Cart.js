import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const Cart = () => {
  const [cartsState, setCartState] = useState({ isLoading: true });
  //get all cart
  const getAllCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/cart/all`);
      if (response.data.success) {
        setCartState({ isLoading: false, carts: response.data.carts });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //addToast
  const { addToast } = useToasts();

  //delete cart
  const onDeleteCart = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/cart/admin/${id}`);
      if (response.data.success) {
        addToast(response.data.message, { appearance: "success" });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        addToast(error.response.data.message, { appearance: "error" });
        return error.response.data;
      }
      return error;
    }
  };

  //update cart
  const updateCart = async (id, quantily) => {
    if (id && quantily) {
      try {
        const response = await axios.put(`${apiUrl}/cart/admin`, {
          id,
          quantily,
        });
        if (response.data.success) {
          addToast(response.data.message, { appearance: "success" });
          return response.data;
        }
      } catch (error) {
        if (error.response.data) {
          await getAllCart();
          addToast(error.response.data.message, { appearance: "error" });
          return error.response.data;
        }
        return error;
      }
    }
  };
  if (cartsState.isLoading) {
    //call get all carts
    getAllCart();
    return <p>Loading...</p>;
  } else {
    const carts = cartsState.carts;

    return (
      <>
        <div className='container-cart-data'>
          <h2>Cart Manager</h2>
          <table style={{ fontSize: "12px" }}>
            <thead>
              <th>ID</th>
              <th>USERNAME</th>
              <th>PRODUCTNAME</th>
              <th>IMAGE</th>
              <th>QUANTILY</th>
              <th>PRICE</th>
              <th>
                <Link to='/dashboard/carts/add'>
                  <button
                    style={{ backgroundColor: "white", borderRadius: "6px" }}>
                    +Add Cart
                  </button>
                </Link>
              </th>
            </thead>
            <tbody>
              {carts.map((cart, index) => {
                return (
                  <tr>
                    <td>{cart._id}</td>
                    <td>{cart.user ? cart.user.username : ""}</td>
                    <td>{cart.item ? cart.item.itemName : ""}</td>
                    <td className='item-image'>
                      <img
                        className='it-image'
                        src={`${cart.item.pathImage}`}
                      />
                    </td>
                    <td>
                      <input
                        style={{
                          height: "18px",
                          width: "32px",
                          margin: "0px",
                          border: "none",
                          fontSize: "12px",
                        }}
                        onBlur={async (e) => {
                          if (parseInt(e.target.value)) {
                            await updateCart(
                              cart._id,
                              parseInt(e.target.value)
                            );
                            await getAllCart();
                          }
                          await getAllCart();
                        }}
                        defaultValue={`${cart.quantily}`}
                      />
                    </td>
                    <td>{cart.item ? cart.item.priceExport : ""}</td>
                    <td style={{ position: "relative" }}>
                      <button
                        className='delete'
                        onClick={async (e) => {
                          if (window.confirm("Do you want to delete?")) {
                            await onDeleteCart(e.target.value);
                            await getAllCart();
                          }
                        }}
                        value={cart._id}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};

export default Cart;
