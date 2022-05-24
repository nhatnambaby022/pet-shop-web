import React, { useContext } from "react";
import { OrdersContext } from "../../contexts/contexts";
import Nav from "../header-footer/Nav";
import { Link } from "react-router-dom";
import Footer from "../header-footer/Footer";
const Ordered = () => {
  const {
    ordersState: { isLoading, orders },
    deleteOrder,
    loadOrder,
  } = useContext(OrdersContext);

  let date;
  const onDelete = (e) => {
    if (window.confirm("Bạn có muốn xóa đơn hàng này không?")) {
      deleteOrder(e.target.value);
    }
  };
  return (
    <div>
      <Nav />

      <div
        className='container'
        style={{
          height: "calc(100vh)",
          paddingTop: "78px",
          flexDirection: "column",
          justifyContent: "center",
        }}>
        <h2>{orders.length == 0 ? `Chưa có đơn hàng` : `Đơn hàng`}</h2>
        <div style={{ marginTop: "12px", fontSize: "14px" }}>
          {orders.map((order) => {
            let delButon = <></>;
            if (order.status == "Wait") {
              delButon = (
                <button
                  className='button-del'
                  value={order._id}
                  onClick={onDelete}>
                  Xóa
                </button>
              );
            } else {
              delButon = <></>;
            }
            date = new Date(order.date);
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let h = date.getHours();
            let mi = date.getMinutes();
            return (
              <div
                className='order-layout'
                style={{ backgoundColor: "aliceblue" }}>
                <Link to={`/ordered/${order._id}`}>
                  <button className='link-view'>Xem</button>
                </Link>
                {delButon}
                <span>ID: {order._id}</span>
                <span>Trạng thái: {order.status}</span>
                <span>Tổng tiền: {order.price}</span>
                <span>Ngày đặt: {`${h}:${mi} ${day}/${month}/${year}`}</span>
                {order.note ? <span>Ghi chú: {order.note}</span> : <></>}
                <span>Thông tin nhận hàng:</span>
                <span> {order.receive}</span>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Ordered;
