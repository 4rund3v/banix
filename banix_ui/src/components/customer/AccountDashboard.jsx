import React, { useState, useEffect } from "react";
// third-party
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions
import { getCustomerAddress } from "../../actions/customerActions";
import { getOrderList } from "../../actions/orderActions";
// components
// import Message from "../misc/Message";
// import Loader from "../misc/Loader";
import AddressCard from "./AddressCard";
import ProfileCard from "./ProfileCard";
import OrderTable from "./OrderTable";

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

  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;
  useEffect(() => {
    const latestOrders = true;
    dispatch(getOrderList(latestOrders));
  }, [dispatch]);
  console.log("[AccountDashboard] The orders fetched are ::: ", orders);
  return (
    <div className="dashboard">
      <Helmet>
        <title>{`My Account — Banix`}</title>
      </Helmet>
      <ProfileCard customerInfo={customerInfo} />
      <div className="dashboard__address card address-card address-card--featured">
        {addresses && addresses.length >= 1 ? (
          <>
            <div className="address-card__badge">Default Address</div>
            <AddressCard address={addresses[0]} />
          </>
        ) : (
          <Link
            to={`/account/addresses/add-address`}
            className="card-body profile-card__body"
          >
            {/* TODO : fix classname*/}
            <div className="addresses-list__plus" />
            <div className="btn btn-secondary">Add New Address</div>
          </Link>
        )}
      </div>
      <OrderTable orderList={orders} />
    </div>
  );
};

export default AccountDashboard;
