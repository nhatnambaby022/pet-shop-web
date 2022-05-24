import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", width: "100vw" }}>
      <Sidebar />
      <div
        style={{
          width: "90%",
          display: "flex",
          justifyContent: "center",
          marginTop: "12px",
        }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
