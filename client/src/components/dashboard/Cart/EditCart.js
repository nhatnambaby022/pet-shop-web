import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const EditCart = () => {
  //add Toast
  const { addToast } = useToasts();
  const [cart, setCart] = useState({
    username: "",
    itemName: "",
    quantily: "",
  });
  //creat
  const createCart = async (cart) => {
    try {
      const response = await axios.post(`${apiUrl}/cart/admin`, cart);
      if (response.data.success) {
        window.alert(response.data.message);
        window.location = "/dashboard/carts";
      }
    } catch (error) {
      if (error.response.data) {
        addToast(error.response.data.message, { appearance: "error" });
        return error.response.data;
      }
      return error;
    }
  };
  const { username, itemName, quantily } = cart;

  //onchange form
  const onChangeForm = (e) => {
    setCart({ ...cart, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <form
        className='form-infor'
        onSubmit={(e) => {
          e.preventDefault();
          createCart(cart);
        }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            alignContent: "center",
            margin: "6px 6px 0px 0px",
          }}>
          <Link to='/dashboard/carts'>
            <span className='out-form'>x</span>
          </Link>
        </div>
        <h3>Create Cart</h3>
        <div>
          <p>Username</p>
          <input
            type='text'
            placeholder='Username'
            name='username'
            required
            value={username}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <p>Product Name</p>
          <input
            type='text'
            placeholder='Product Name'
            name='itemName'
            required
            value={itemName}
            onChange={onChangeForm}
          />
        </div>
        <div>
          <p>Quantily</p>
          <input
            type='number'
            placeholder='Quantily'
            name='quantily'
            required
            value={quantily}
            onChange={onChangeForm}
          />
        </div>
        <br />{" "}
        <button
          type='submit'
          style={{ marginBottom: "24px" }}
          className='update-button'>
          CREATE
        </button>
      </form>
    </div>
  );
};

export default EditCart;
