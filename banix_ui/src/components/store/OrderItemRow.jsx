import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
const OrderItemRow = ({ orderItem }) => {
  return (
    <Row>
      <Col md={2}>
        <Image
          src={`/media/images/cart/${orderItem.productPrimaryImage}`}
          alt={orderItem.productName}
          fluid
          rounded
        />
      </Col>
      <Col>
        <Link to={`/product/${orderItem.productId}`}>
          <strong>{orderItem.productName}</strong>
        </Link>
      </Col>
      <Col md={4}>
        {orderItem.qty} x &#8377; {orderItem.productSellingPrice} =
        <strong>
          {" "}
          &#8377; {orderItem.qty * orderItem.productSellingPrice}
        </strong>
      </Col>
    </Row>
  );
};

export default OrderItemRow;
