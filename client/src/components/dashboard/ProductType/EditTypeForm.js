import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";

const EditTypeForm = () => {
  const [button, setButton] = useState(<></>);
  const [typeState, setTypeState] = useState({
    isLoading: true,
    type: "",
  });
  const { addToast } = useToasts();

  //get infor user
  let { id } = useParams();
  const getType = async (id) => {
    const response = await axios.get(`${apiUrl}/types/${id}`);
    if (response.data.success) {
      setTypeState({
        isLoading: false,
        type: response.data.type,
      });
      return response.data;
    } else {
      return response.data;
    }
  };

  // get and reder user form
  if (typeState.isLoading && id !== "add") {
    getType(id);
    return <p>Loading...</p>;
  } else {
    const { _id, nameType } = typeState.type;
    const onChangType = (event) => {
      setButton(
        <button style={{ marginBottom: "24px" }} className='update-button'>
          {id === "add" ? "Create" : "Update"}
        </button>
      );
      setTypeState({
        ...typeState,
        type: { ...typeState.type, [event.target.name]: event.target.value },
      });
    };
    const UpdateTypes = async (event) => {
      event.preventDefault();
      if (nameType) {
        if (id === "add") {
          try {
            //add user
            const response = await axios.post(`${apiUrl}/types/`, { nameType });
            if (response.data.success) {
              window.alert("Add type product successfull.");
              window.location = "/dashboard/types";
            }
          } catch (error) {
            if (error.response.data) {
              addToast(error.response.data.message, { appearance: "error" });
              return error.response.data;
            } else {
              return { success: false, message: error };
            }
          }
        } else {
          try {
            //update user
            const response = await axios.put(`${apiUrl}/types/${id}`, {
              nameType,
            });
            if (response.data.success) {
              window.alert("Update product successfull");
              window.location = "/dashboard/types";
            }
          } catch (error) {
            if (error.response.data) {
              addToast(error.response.data.message, { appearance: "error" });
              return error.response.data;
            } else {
              return { success: false, message: error };
            }
          }
        }
      } else {
        addToast("Type name is empty", { appearance: "error" });
      }
    };
    return (
      <>
        <form className='form-infor' onSubmit={UpdateTypes}>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignContent: "center",
              margin: "6px 6px 0px 0px",
            }}>
            <Link to='/dashboard/types'>
              <span className='out-form'>x</span>
            </Link>
          </div>
          <h3>{id === "add" ? "Create Type Product" : "Edit Type Product"}</h3>
          <p>{`ID: ${_id}`}</p>
          <div>
            <p>Type Product Name</p>
            <input
              type='text'
              placeholder='Type Product Name'
              name='nameType'
              required
              onChange={onChangType}
              value={nameType}
            />
          </div>
          <br /> {button}
        </form>
      </>
    );
  }
};

export default EditTypeForm;
