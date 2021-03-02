import React from "react";
import { Link } from "react-router-dom";

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

const OrderTable = ({ orderList }) => {
  console.log("[OrderTable] the orders are :: ", orderList);
  const orders = orderList.slice(0, 3).map((order) => {
    const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
      order.orderDate
    );
    const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(
      order.orderDate
    );
    const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
      order.orderDate
    );
    const orderDate = `${da}-${mo}-${ye}`;
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
