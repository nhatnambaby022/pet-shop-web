import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const ProductType = () => {
  const [typeState, setTypeState] = useState({
    isLoading: true,
    types: [],
  });

  //add Toast
  const { addToast } = useToasts();
  //get types products
  const getAllType = async () => {
    try {
      const response = await axios.get(`${apiUrl}/types`);
      if (response.data.success) {
        setTypeState({ isLoading: false, types: response.data.itemtypes });
        return response.data;
      }
    } catch (error) {
      if (error.response.data) {
        return error.response.data;
      }
      console.log(error);
      return error;
    }
  };
  //delete product
  const deleteType = async (id) => {
    try {
      const response = await axios.delete(`${apiUrl}/types/${id}`);
      if (response.data.success) {
        addToast(response.data.message, { appearance: "warning" });
        getAllType();
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

  //call get types product
  if (typeState.isLoading) {
    getAllType();
    return <p>Loading....</p>;
  } else {
    let types = typeState.types;
    return (
      <>
        <div className='container-cart-data'>
          <h2>Types Product Manager</h2>
          <table style={{ fontSize: "12px" }}>
            <thead>
              <th>ID</th>
              <th>NAME TYPE</th>
              <th>
                <Link to='/dashboard/types/add'>
                  <button
                    style={{ backgroundColor: "white", borderRadius: "6px" }}>
                    +Add Type
                  </button>
                </Link>
              </th>
            </thead>
            <tbody>
              {types.map((type) => {
                return (
                  <tr>
                    <td>{type._id}</td>
                    <td>{type.nameType}</td>
                    <td style={{ position: "relative" }}>
                      <Link to={`/dashboard/types/${type._id}`}>
                        <button className='edit'>Edit</button>
                      </Link>
                      <button
                        className='delete'
                        onClick={async (e) => {
                          if (window.confirm("Do you want to delete?")) {
                            await deleteType(e.target.value);
                          }
                        }}
                        value={type._id}>
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

export default ProductType;
