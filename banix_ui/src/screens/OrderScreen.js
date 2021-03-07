import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import { getOrderDetails } from "../actions/orderActions";
import ShippingAddressCard from "../components/store/ShippingAddressCard";
import OrderItemRow from "../components/store/OrderItemRow";
import InvoiceButton from "../components/store/InvoiceButton";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  console.log("[OrderScreen] The order id is :: ", orderId);
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderInfo;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch]);
  console.log("[OrderScreen] The order is ::: ", order);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row>
        <Link className="btn btn-info my-3" to="/">
          {"Return To Store"}
        </Link>
      </Row>
      <h2>Order Details</h2>
      <Row fluid>
        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                <br />
              </p>
              <ShippingAddressCard
                shippingAddress={order.orderShippingAddress}
              />
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Your Order Items is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((orderItem, index) => (
                    <ListGroup.Item key={index}>
                      <OrderItemRow orderItem={orderItem} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <strong>Order Summary</strong>
                <InvoiceButton orderId={orderId} />
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Items Price</Col>
                  <Col md={4}>
                    <span className="font-weight-bold text-right">
                      &#8377; {order.orderPrice.totalSellingPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Shipping</Col>
                  <Col md={4}>
                    <span className="font-weight-bold text-right">
                      &#8377; {order.orderPrice.totalShippingPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Tax</Col>
                  <Col md={4}>
                    <span className="font-weight-bold text-right">
                      &#8377; {order.orderPrice.totalTaxPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col md={6}>Total</Col>
                  <Col md={4}>
                    <span className="font-weight-bold text-right">
                      &#8377; {order.orderPrice.totalPrice}
                    </span>
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
