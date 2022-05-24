import React from "react";

const OrderDetail = ({ orderDetails }) => {
  return (
    <>
      <div className='container-cart-data'>
        <h2>Order Detail</h2>
        <table style={{ fontSize: "12px" }}>
          <thead>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>QUANTILY</th>
            <th>PRICE</th>
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
    </>
  );
};

export default OrderDetail;
