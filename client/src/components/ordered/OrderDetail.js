import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";
import Footer from "../header-footer/Footer";
import Nav from "../header-footer/Nav";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetailState, setOrderDetailState] = useState({
    isLoading: true,
    orderDetail: [],
  });
  const getOrderDetail = async (id) => {
    const response = await axios.get(`${apiUrl}/orderDetail/${id}`);
    if (response.data.success) {
      setOrderDetailState({
        isLoading: false,
        orderDetail: response.data.orderDetail,
      });
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        getOrderDetail(id);
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, []);
  if (orderDetailState.isLoading) {
    return <p>Loading...</p>;
  }
  const orderDetails = orderDetailState.orderDetail;
  return (
    <>
      <Nav />
      <div
        style={{
          paddingTop: "80px",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className='container-cart-data'>
        <h2>Chi tiết của đơn hàng</h2>
        <table style={{ fontSize: "12px", maxWidth: "800px" }}>
          <thead>
            <th>Ảnh</th>
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá</th>
          </thead>
          <tbody>
            {orderDetails.map((orderDetail) => {
              return (
                <tr>
                  <td className='item-image'>
                    <img
                      className='it-image'
                      src={orderDetail.item ? orderDetail.item.pathImage : ""}
                    />
                  </td>
                  <td>{orderDetail.item ? orderDetail.item.itemName : ""}</td>
                  <td>{orderDetail.quantily ? orderDetail.quantily : ""}</td>
                  <td>
                    {orderDetail.item ? orderDetail.item.priceExport : ""}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default OrderDetail;
