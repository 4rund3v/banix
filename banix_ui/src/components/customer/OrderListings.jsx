import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import OrderDetailsHeader from "./OrderDetailsHeader";
import OrderItemInfo from "./OrderItemInfo";

const prepareOrderListing = (order, buyAgainHandler) => {
  return (
    <Row key={order.orderInfoId} className="order__listing-row">
      <Col xs={12}>
        <OrderDetailsHeader order={order} />
        {order.orderItems.map((item) => (
          <OrderItemInfo
            key={item.orderProductId}
            orderProductInfo={item}
            buyAgainHandler={buyAgainHandler}
          />
        ))}
      </Col>
    </Row>
  );
};
const OrderListings = ({ orderList, buyAgainHandler }) => {
  return (
    <Container>
      {orderList.map((order) => prepareOrderListing(order, buyAgainHandler))}
    </Container>
  );
};

export default OrderListings;
