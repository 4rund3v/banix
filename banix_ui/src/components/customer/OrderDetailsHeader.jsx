import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { numberWithCommas, getDateStringFromIsoTimestamp } from "../../utils";

const OrderDetailsHeader = ({ order }) => {
  const orderPlacedDate = getDateStringFromIsoTimestamp(order.orderDate);
  const orderPrice = numberWithCommas(order.orderPrice.totalPrice);
  return (
    <Row className="order__listing-row-order-info">
      <Col sm={3} className="order__listing-col">
        <p className="order__listing-text-header">
          Order Placed <br />
          {orderPlacedDate}
        </p>
      </Col>
      <Col sm={3} className="order__listing-col">
        <p className="order__listing-text-header">
          Total
          <br />
          &#8377; {orderPrice}
        </p>
      </Col>
      <Col sm={3} className="order__listing-col">
        <p className="order__listing-text-header">
          Order Details <br />
          <Link to={`/account/orders-details/${order.orderId}`}>
            banix-{order.orderId}
          </Link>
        </p>
      </Col>
      <Col sm={3} className="order__listing-col">
        <p className="order__listing-text-header">
          Download
          <br />
          <Link to="">Invoice</Link>
        </p>
      </Col>
    </Row>
  );
};

export default OrderDetailsHeader;
