import React, { useEffect } from "react";
// third party
import { useDispatch, useSelector } from "react-redux";
// functions / actions
import { getOrderList } from "../../actions/orderActions";
// components
import OrderListings from "./OrderListings";

const AccountOrders = ({ history }) => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.orderList);
  const { orders } = orderList;

  useEffect(() => {
    dispatch(getOrderList());
  }, [dispatch]);

  const buyAgainHandler = (productId) => {
    history.push(`/product/${productId}`);
  };
  return (
    <React.Fragment>
      <h3>Your Orders</h3>
      {orders.length > 0 ? (
        <OrderListings orderList={orders} buyAgainHandler={buyAgainHandler} />
      ) : (
        <p>No Orders Placed</p>
      )}
    </React.Fragment>
  );
};

export default AccountOrders;
