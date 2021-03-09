import React, { useEffect } from "react";
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

const AccountDashboard = () => {
  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;

  const customerAddress = useSelector((state) => state.customerAddress);
  const { addresses } = customerAddress;
  useEffect(() => {
    const defaultAddress = true;
    dispatch(getCustomerAddress(defaultAddress));
  }, [dispatch]);

  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;
  useEffect(() => {
    const latestOrders = true;
    dispatch(getOrderList(latestOrders));
  }, [dispatch]);

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
