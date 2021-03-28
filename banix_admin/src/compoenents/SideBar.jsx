import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h1>
          <span className="las la-bolt"></span>banix
        </h1>
      </div>
      <div className="sidebar-menu">
        <ul>
          <li className="sidebar-item-active">
            <Link to="/dashboard">
              <span className="las la-igloo"></span>
              <span>Dashboard</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/orders">
              <span className="las la-clipboard-list"></span>
              <span>Orders</span>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/products">
              <span className="las la-boxes"></span>
              <span>Products</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/mail">
              <span className="las la-mail-bulk"></span>
              <span>Mail</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/customers">
              <span className="las la-users"></span>
              <span>Users</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/settings">
              <span className="las la-cog"></span>
              <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
