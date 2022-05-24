import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { apiUrl } from "../../../contexts/constants";

const EditUserForm = () => {
  const [button, setButton] = useState(<></>);
  const [userInfor, setUserInfor] = useState({
    isLoading: true,
    user: {
      _id: "undefined",
      username: "",
      password: "",
      cf_password: "",
      fullname: "",
      phone: "",
      email: "",
      address: "",
    },
  });
  const { addToast } = useToasts();

  //get infor user
  let { id } = useParams();
  const getInforUser = async (id) => {
    const response = await axios.get(`${apiUrl}/users/user/${id}`);
    if (response.data.success) {
      setUserInfor({
        isLoading: false,
        user: { ...userInfor.user, ...response.data.user },
      });
      return response.data;
    } else {
      return response.data;
    }
  };

  // get and reder user form
  if (userInfor.isLoading && id !== "add") {
    getInforUser(id);
    return <p>Loading...</p>;
  } else {
    const {
      _id,
      username,
      password,
      cf_password,
      fullname,
      phone,
      email,
      address,
    } = userInfor.user;
    const onChangInfor = (event) => {
      setButton(
        <button style={{ marginBottom: "24px" }} className='update-button'>
          {id === "add" ? "Create" : "Update"}
        </button>
      );
      setUserInfor({
        ...userInfor,
        user: { ...userInfor.user, [event.target.name]: event.target.value },
      });
    };
    const UpdateUserInfor = async (event) => {
      event.preventDefault();
      if (password == cf_password) {
        if (id === "add") {
          try {
            //add user
            const addUser = await axios.post(`${apiUrl}/auth/register`, {
              username,
              password,
              fullname,
              phone,
              email,
              address,
            });
            if (addUser.data.success) {
              window.alert(addUser.data.message);
              window.location = "/dashboard/users";
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
            const response = await axios.put(`${apiUrl}/users/update`, {
              _id,
              username,
              password,
              fullname,
              phone,
              email,
              address,
            });
            if (response.data.success) {
              window.alert(response.data.message);
              window.location = "/dashboard/users";
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
        addToast("Password and Comfirm password are different!", {
          appearance: "error",
        });
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
            <Link to='/dashboard/users'>
              <span className='out-form'>x</span>
            </Link>
          </div>
          <h3>{id === "add" ? "Create User" : "Edit User"}</h3>
          <p>{`ID: ${_id}`}</p>
          <div>
            <p>Username</p>
            <input
              type='text'
              placeholder='Username'
              name='username'
              required
              onChange={onChangInfor}
              value={username}
            />
          </div>
          <div>
            <p>Password</p>
            <input
              type='password'
              placeholder='Password'
              name='password'
              onChange={onChangInfor}
              value={password}
              required={id === "add" ? true : false}
            />
          </div>
          <div>
            <p>Confirm Password</p>
            <input
              type='password'
              placeholder='Confirm Password'
              name='cf_password'
              onChange={onChangInfor}
              value={cf_password}
              required={id === "add" ? true : false}
            />
          </div>
          <div>
            <p>Full Name</p>
            <input
              type='text'
              placeholder='Full Name'
              name='fullname'
              onChange={onChangInfor}
              value={fullname}
            />
          </div>
          <div>
            <p>Phone Number</p>
            <input
              type='text'
              placeholder='Phone Number'
              name='phone'
              pattern='0[1-9][0-9]{8}'
              onChange={onChangInfor}
              value={phone}
            />
          </div>
          <div>
            <p>Email</p>
            <input
              type='email'
              placeholder='Email'
              name='email'
              onChange={onChangInfor}
              value={email}
            />
          </div>
          <div>
            <p>Address</p>
            <textarea
              name='address'
              placeholder='Address'
              cols='10'
              rows='5'
              style={{ marginTop: "6px", width: "250px" }}
              onChange={onChangInfor}
              value={address}
            />
          </div>
          <br /> {button}
        </form>
      </>
    );
  }
};

export default EditUserForm;
