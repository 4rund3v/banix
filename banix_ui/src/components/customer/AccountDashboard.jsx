import React from "react";
// third-party
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// data stubs
// import addresses from "../../data/accountAddresses";
// import allOrders from "../../data/accountOrders";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getCustomerDetails,
  updateCustomerDetails,
} from "../../actions/customerActions";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import { useState, useEffect } from "react";

const AccountDashboard = () => {
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  console.log("[AccountDashboard] the customerInfo is : ", customerInfo);

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
  console.log("[AccountDashboard] the customerDetails is : ", customerDetails);

  const customerCartInfo = useSelector((state) => state.cart);
  const { shippingAddress } = customerCartInfo;
  console.log("[AccountDashboard] the shippingAddress is : ", shippingAddress);
  const address = [];
  const orders = [];
  return (
    <div className="dashboard">
      <Helmet>
        <title>{`My Account — ${customerInfo.displayName}`}</title>
      </Helmet>

      <div className="dashboard__profile card profile-card">
        <div className="card-body profile-card__body">
          <div className="profile-card__avatar">
            <img src="images/user-avatar.png" alt="" />
          </div>
          <div className="profile-card__name">{customerInfo.displayName}</div>
          <div className="profile-card__email">{customerInfo.emailId}</div>
          <div className="profile-card__edit">
            <Link to="profile" className="btn btn-secondary btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard__address card address-card address-card--featured">
        {/* {address.default && (
          <div className="address-card__badge">Default Address</div>
        )} */}
        {shippingAddress && (
          <div className="address-card__badge">Default Address</div>
        )}
        <div className="address-card__body">
          <div className="address-card__name">{`${shippingAddress.fullName}`}</div>
          <div className="address-card__row">
            {shippingAddress.buildingInfo}
            <br />
            {shippingAddress.streetInfo}
            <br />
            {shippingAddress.cityInfo}, {shippingAddress.pinCode}
            <br />
          </div>
          <div className="address-card__row">
            <div className="address-card__row-title">Phone Number</div>
            <div className="address-card__row-content">
              {shippingAddress.mobileNumber}
            </div>
          </div>
          {/* <div className="address-card__row">
            <div className="address-card__row-title">Email Address</div>
            <div className="address-card__row-content">{address.email}</div>
          </div> */}
          <div className="address-card__footer">
            <Link to="/">Edit Address</Link>
          </div>
        </div>
      </div>
      <div className="dashboard__orders card">
        <div className="card-header">
          <h5>Recent Orders</h5>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <div className="table-responsive-sm">
            <table>
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
