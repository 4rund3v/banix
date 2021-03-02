import React from "react";
import { Link } from "react-router-dom";
import { numberWithCommas, getDateStringFromIsoTimestamp } from "../../utils";

const OrderTable = ({ orderList }) => {
  const orders = orderList.slice(0, 3).map((order) => {
    const orderDate = getDateStringFromIsoTimestamp(order.Date);
    const orderPrice = numberWithCommas(order.orderPrice.totalPrice);
    return (
      <tr key={order.id}>
        <td>
          <Link to={`/account/orders/order-info/${order.orderId}`}>
            banix-{order.orderId}
          </Link>
        </td>
        <td>{orderDate}</td>
        <td>{order.orderStatus.status}</td>
        <td>&#8377; {orderPrice}</td>
      </tr>
    );
  });
  return (
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
                <th>Order-ID</th>
                <th>Order Placed</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;
