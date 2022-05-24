import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const Orders = () => {
  //set orders state
  const [ordersState, setOrdersState] = useState({ Loading: true, orders: [] });
  //add toast
  const { addToast } = useToasts();

  //get all order
  const getAllOrder = async () => {
    let response = await axios.get(`${apiUrl}/orders/admin/all`);
    if (response.data.success) {
      setOrdersState({ Loading: false, orders: response.data.orders });
    }
  };
  //Load order
  useEffect(() => {
    async function fetchData() {
      try {
        await getAllOrder();
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, [ordersState]);

  //delete user
  const deleteOrder = async (id) => {
    try {
      let response = await axios.delete(`${apiUrl}/orders/${id}`);
      if (response.data.success) {
        addToast(response.data.message, { appearance: "warning" });
        getAllOrder();
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
  //delete
  const onDeleteOrder = async (e) => {
    if (window.confirm("Do you want to delete a user?")) {
      await deleteOrder(e.target.value);
    }
  };

  //data status

  const statusColor = {
    Wait: { color: "gray" },
    Accept: { color: "aqua" },
    Deny: { color: "red" },
    Delivering: { color: "yellow" },
    Done: { color: "greenyellow" },
  };
  if (ordersState.Loading) {
    return <a>Loading...</a>;
  } else {
    let orders = ordersState.orders;
    return (
      <>
        <div className='container-orders-data'>
          <h2>Orders Manager</h2>
          <table style={{ fontSize: "12px" }}>
            <thead>
              <th>ID</th>
              <th>USERNAME</th>
              <th>PRICE</th>
              <th>RECEIVE</th>
              <th>STATUS</th>
              <th>NOTE</th>
              <th>DATE</th>
              <th></th>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.user.username}</td>
                    <td>{order.price}</td>
                    <td>{order.receive}</td>
                    <td>
                      <span
                        style={{
                          color: "white",
                          backgroundColor: statusColor[order.status].color,
                          border: `1px solid ${
                            statusColor[order.status].color
                          }`,
                          padding: "3px 6px 3px 6px",
                          borderRadius: "6px",
                        }}>
                        {order.status}
                      </span>
                    </td>
                    <td>{order.note}</td>
                    <td>{order.date}</td>
                    <td style={{ position: "relative" }}>
                      <Link to={`/dashboard/orders/${order._id}`}>
                        <button className='edit'>Edit</button>
                      </Link>
                      <button
                        className='delete'
                        onClick={onDeleteOrder}
                        value={order._id}>
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

export default Orders;
