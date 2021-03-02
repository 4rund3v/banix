import React, { useState, useEffect } from "react";
// third party
import { useDispatch, useSelector } from "react-redux";
// functions / actions
import { getOrderList } from "../../actions/orderActions";
// components
import OrderListings from "./OrderListings";

const AccountOrders = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;
  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  return (
    <React.Fragment>
      <h3>Your Orders</h3>
      {orders.length > 0 ? (
        <OrderListings orderList={orders} />
      ) : (
        <p>No Orders Placed</p>
      )}
    </React.Fragment>
  );
};

export default AccountOrders;
