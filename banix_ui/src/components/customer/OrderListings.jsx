import React from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const numberWithCommas = (x) => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};
const prepareOrderListing = (orderItem) => {
  const ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(
    orderItem.orderDate
  );
  const mo = new Intl.DateTimeFormat("en", { month: "long" }).format(
    orderItem.orderDate
  );
  const da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(
    orderItem.orderDate
  );
  const orderPlacedDate = `${da}-${mo}-${ye}`;
  const orderPrice = numberWithCommas(orderItem.orderPrice.totalPrice);

  return (
    <Row className="order__listing-row justify-content-md-center">
      <Col xs={12}>
        <Row>
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
              <Link to={`/account/orders/order-info/${orderItem.orderId}`}>
                banix-{orderItem.orderId}
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
      </Col>
    </Row>
  );
};
const OrderListings = ({ orderList }) => {
  console.log("[OrderListings] The order list is ::: ", orderList);
  return (
    <Container>
      {orderList.map((orderItem) => prepareOrderListing(orderItem))}
    </Container>
  );
};

export default OrderListings;
