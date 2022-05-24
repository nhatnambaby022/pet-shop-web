import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";
const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Dashboard</h3>
          <Link to='/' className='link'>
            <li className='sidebarListItem active'>Home</li>
          </Link>
        </div>
        <div className='sidebarMenu'>
          <h3 className='sidebarTitle'>Menu</h3>
          <ul className='sidebarList'>
            <Link to='/dashboard/users' className='link'>
              <li className='sidebarListItem'>Users</li>
            </Link>
            <Link to='/dashboard/products' className='link'>
              <li className='sidebarListItem'>Products</li>
            </Link>
            <Link to='/dashboard/types' className='link'>
              <li className='sidebarListItem'>Types Product</li>
            </Link>
            <Link to='/dashboard/carts' className='link'>
              <li className='sidebarListItem'>Carts</li>
            </Link>
            <Link to='/dashboard/orders' className='link'>
              <li className='sidebarListItem'>Orders</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
