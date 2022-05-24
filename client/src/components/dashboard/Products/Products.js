import axios from "axios";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const Products = () => {
  const [productsState, setProductsState] = useState({
    isLoading: true,
    products: [],
  });
  //add toast
  const { addToast } = useToasts();
  //get all products
  const getProducts = async () => {
    const response = await axios.get(`${apiUrl}/items/`);
    if (response.data.success) {
      setProductsState({ isLoading: false, products: response.data.allItems });
    }
  };

  //delete product
  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/items/${id}`);
      if (response.data.success) {
        addToast("Delete product successfull", { appearance: "warning" });
        getProducts();
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
  const onDeleteProduct = (e) => {
    if (window.confirm("Do you want to delete this product?")) {
      deleteProduct(e.target.value);
    }
  };

  if (productsState.isLoading) {
    getProducts();
    return <a>Loading...</a>;
  } else {
    let products = productsState.products;
    return (
      <>
        <div className='container-products-data'>
          <h2>Product Manager</h2>
          <table style={{ fontSize: "12px" }}>
            <thead>
              <th>ID</th>
              <th>PRODUCT NAME</th>
              <th>IMAGE</th>
              <th>QUANTILY</th>
              <th>PRICE IMPORT</th>
              <th>PRICE EXPORT</th>
              <th>DESCRIPTION</th>
              <th>TYPE NAME</th>
              <th>
                <Link to='/dashboard/products/add'>
                  <button
                    style={{ backgroundColor: "white", borderRadius: "6px" }}>
                    +Create Product
                  </button>
                </Link>
              </th>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr>
                    <td>{product._id}</td>
                    <td>{product.itemName}</td>
                    <td className='item-image'>
                      <img className='it-image' src={`${product.pathImage}`} />
                    </td>
                    <td>{product.quantily}</td>
                    <td>{product.priceImport}</td>
                    <td>{product.priceExport}</td>
                    <td>{product.description}</td>
                    <td>{product.type ? product.type.nameType : ""}</td>
                    <td style={{ position: "relative" }}>
                      <Link to={`/dashboard/products/${product._id}`}>
                        <button className='edit'>Edit</button>
                      </Link>
                      <button
                        className='delete'
                        onClick={onDeleteProduct}
                        value={product._id}>
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

export default Products;
