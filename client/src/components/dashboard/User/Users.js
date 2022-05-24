import axios from "axios";
import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { apiUrl } from "../../../contexts/constants";

const Users = () => {
  const [usersState, setUsersState] = useState({ Loading: true, users: [] });
  //add toast
  const { addToast } = useToasts();
  //get all user
  const getAllUser = async () => {
    let response = await axios.get(`${apiUrl}/users/all`);
    setUsersState({ Loading: false, users: response.data.users });
  };

  //delete user
  const deleteU = async (userId) => {
    try {
      let response = await axios.delete(`${apiUrl}/users/${userId}`);
      if (response.data.success) {
        addToast(response.data.message, { appearance: "warning" });
        getAllUser();
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
  //Load users
  if (usersState.Loading) {
    getAllUser();
  }
  //delete
  const deleteUser = (e) => {
    if (window.confirm("Do you want to delete a user?")) {
      deleteU(e.target.value);
    }
  };

  if (usersState.Loading) {
    return <a>Loading...</a>;
  } else {
    let users = usersState.users;
    return (
      <>
        <div className='container-users-data'>
          <h2>User Manager</h2>
          <table style={{ fontSize: "12px" }}>
            <thead>
              <th>ID</th>
              <th>USERNAME</th>
              <th>FULLNAME</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th>ADDRESS</th>
              <th>CREATE AT</th>
              <th>
                <Link to='/dashboard/users/add'>
                  <button
                    style={{ backgroundColor: "white", borderRadius: "6px" }}>
                    +Add User
                  </button>
                </Link>
              </th>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.username}</td>
                    <td>{user.fullname}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <td>{user.createdAt}</td>
                    <td style={{ position: "relative" }}>
                      <Link to={`/dashboard/users/${user._id}`}>
                        <button className='edit'>Edit</button>
                      </Link>
                      <button
                        className='delete'
                        onClick={deleteUser}
                        value={user._id}>
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

export default Users;
