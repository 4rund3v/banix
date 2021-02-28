import React, { useState, useEffect } from "react";
// third-party
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

// data stubs
// import addresses from "../../data/accountAddresses";
// import allOrders from "../../data/accountOrders";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerAddress } from "../../actions/customerActions";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import AddressCard from "./AddressCard";

const AccountDashboard = ({ match }) => {
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  console.log("[AccountDashboard] the customerInfo is : ", customerInfo);

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
  console.log("[AccountDashboard] the customerDetails is : ", customerDetails);

  const customerAddress = useSelector((state) => state.customerAddress);
  const { loadingAddress, errorAddress, addresses } = customerAddress;
  useEffect(() => {
    const defaultAddress = true;
    dispatch(getCustomerAddress(defaultAddress));
  }, [dispatch]);

  console.log("[AccountDashboard] The addresses are ::: ", addresses);

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
        {addresses && addresses.length >= 1 ? (
          <>
            <div className="address-card__badge">Default Address</div>
            <AddressCard address={addresses[0]} />
          </>
        ) : (
          <Link
            to={`${match.path}/add-address`}
            className="card-body profile-card__body"
          >
            {/* TODO : fix classname*/}
            <div className="addresses-list__plus" />
            <div className="btn btn-secondary">Add New Address</div>
          </Link>
        )}
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
