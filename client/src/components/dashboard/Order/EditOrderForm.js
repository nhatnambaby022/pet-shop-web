import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";
import OrderDetail from "./OrderDetail";

const EditOrderForm = () => {
  const [button, setButton] = useState(<></>);
  const [orderState, setOrderState] = useState({
    isLoading: true,
    order: {
      _id: "undefined",
      user: "",
      price: "",
      receive: "",
      status: "",
      note: "",
      orderDetail: [],
    },
  });
  const { addToast } = useToasts();
  const [statusState, setStatusState] = useState("Wait");
  //get infor user
  let { id } = useParams();
  const getOrderState = async (id) => {
    const response = await axios.get(`${apiUrl}/orders/${id}`);
    if (response.data.success) {
      setOrderState({
        isLoading: false,
        order: response.data.order,
      });
      return response.data;
    } else {
      return response.data;
    }
  };

  // get and reder user form
  if (orderState.isLoading) {
    getOrderState(id);
    return <p>Loading...</p>;
  } else {
    const statusColor = {
      Wait: { color: "gray" },
      Accept: { color: "aqua" },
      Deny: { color: "red" },
      Delivering: { color: "yellow" },
      Done: { color: "greenyellow" },
    };
    const statusData = ["Wait", "Accept", "Deny", "Delivering", "Done"];
    const { _id, user, price, receive, status, note } = orderState.order;
    const onChangOrder = (event) => {
      setButton(
        <button style={{ marginBottom: "24px" }} className='update-button'>
          Update
        </button>
      );
      if (event.target.name == "status") {
        setStatusState(event.target.value);
      }
      setOrderState({
        ...orderState,
        order: { ...orderState.order, [event.target.name]: event.target.value },
      });
    };
    const UpdateUserInfor = async (event) => {
      event.preventDefault();
      try {
        //update user
        const response = await axios.put(`${apiUrl}/orders/${id}`, {
          price,
          receive,
          status,
          note,
        });
        if (response.data.success) {
          addToast(response.data.message, { appearance: "success" });
        }
      } catch (error) {
        if (error.response.data) {
          addToast(error.response.data.message, { appearance: "error" });
          return error.response.data;
        } else {
          return { success: false, message: error };
        }
      }
    };
    return (
      <>
        <form className='form-infor' onSubmit={UpdateUserInfor}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
              margin: "6px 6px 0px 0px",
            }}>
            <Link to='/dashboard/orders'>
              <span className='out-form'>x</span>
            </Link>
          </div>
          <h3> Edit Order</h3>
          <p>{`ID: ${_id}`}</p>
          <p>Username: {user ? user.username : ""}</p>
          <div>
            <p>Price</p>
            <input
              type='number'
              placeholder='Price'
              name='price'
              onChange={onChangOrder}
              value={price}
              required
            />
          </div>
          <div>
            <p>Receive</p>
            <textarea
              name='address'
              placeholder='Receive'
              cols='10'
              rows='5'
              required
              style={{ marginTop: "6px", width: "250px" }}
              onChange={onChangOrder}
              value={receive}
            />
          </div>
          <div>
            <p>Status</p>
            <select
              className='select-type'
              onChange={onChangOrder}
              name='status'
              style={{
                color: "white",
                backgroundColor: statusColor[statusState].color,
                border: `1px solid ${statusColor[statusState].color}`,
                padding: "3px 6px 3px 6px",
              }}>
              {statusData.map((stt) => {
                return (
                  <option value={stt} selected={stt == status ? true : false}>
                    {stt}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <p>Note</p>
            <textarea
              name='note'
              placeholder='Note'
              cols='10'
              rows='5'
              style={{ marginTop: "6px", width: "250px" }}
              onChange={onChangOrder}
              value={note}
            />
          </div>
          <br /> {button}
        </form>
        <div style={{ marginLeft: "20px" }}>
          <OrderDetail orderDetails={orderState.order.orderDetail} />
        </div>
      </>
    );
  }
};

export default EditOrderForm;
