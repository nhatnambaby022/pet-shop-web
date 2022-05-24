import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { apiUrl } from "../../contexts/constants";
import { CartContext } from "../../contexts/contexts";

const Item = () => {
  const { addItemToCart } = useContext(CartContext);
  const { id } = useParams();
  const [product, setProduct] = useState({
    isLoading: true,
    product: {
      itemName: "",
      quantily: "",
      priceExport: "",
      description: "",
      pathImage: "",
    },
  });
  const getProduct = async (id) => {
    const response = await axios.get(`${apiUrl}/items/${id}`);
    if (response.data.success) {
      setProduct({
        isLoading: false,
        product: { ...response.data.item },
      });
    }
  };
  //Load product
  useEffect(() => {
    async function fetchData() {
      try {
        await getProduct(id);
      } catch (error) {
        return error;
      }
    }
    fetchData();
  }, []);
  if (product.isLoading) {
    return <p>Loading....</p>;
  } else {
    const { itemName, quantily, priceExport, description, pathImage } =
      product.product;
    return (
      <div
        className='info-item'
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        <div
          className='info-layout'
          style={{
            maxWidth: "500px",
            minHeight: "250px",
            maxHeight: "500px",
            minWidth: "250px",
          }}>
          <img
            src={pathImage}
            style={{
              objectFit: "cover",
              maxWidth: "500px",
              minHeight: "250px",
              maxHeight: "500px",
              minWidth: "250px",
            }}
            className='info-img'
          />
        </div>
        <div>
          <h3>Thông tin sản phẩm</h3>
          <table>
            <tr>
              <td>Tên sản phẩm: </td>
              <td className='info-name'>{itemName}</td>
            </tr>
            <tr>
              <td>Số lượng: </td>
              <td className='info-quantily'>{quantily}</td>
            </tr>
            <tr>
              <td>Chi tiết về sản phẩm: </td>
              <td className='info-sale-description'>{description}</td>
            </tr>
          </table>
          <div className='info' style={{ margin: "12px 6px 0px 12px" }}>
            <button
              style={{ marginRight: "12px" }}
              id={id}
              className='addCart'
              value={id}
              onClick={async (e) => {
                await addItemToCart(e.target.value);
              }}>
              Thêm vào giỏ
            </button>
            <Link to='/order'>
              <button className='button-to-order'>Đặt hàng</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default Item;
