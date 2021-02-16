import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/misc/Message";
import CheckoutSteps from "../components/store/CheckoutSteps";
import AddressCard from "../components/store/AddressCard";

import { createOrder } from "../actions/orderActions";
import { Order } from "../schema/order";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("[PlaceOrderScreen] The cart object is : ", cart);
  const { shippingAddress } = cart;
  let itemsPrice = cart.cartItems.reduce(
    (acc, cartItem) =>
      acc + Number(cartItem.productSellingPrice) * Number(cartItem.qty),
    0
  );
  let shippingPrice = Number(0.17 * itemsPrice).toFixed(2);
  let totalPrice = Number(Number(itemsPrice) + Number(shippingPrice)).toFixed(
    2
  );
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success) {
      history.push(`/order/${order.orderId}`);
    }
    // eslint-disable-next-line
  }, [history, success]);

  const placeOrderHandler = () => {
    const order = new Order();
    order.orderItems = cart.cartItems;
    order.orderShippingInfo = cart.shippingAddress;
    order.orderPaymentType = cart.paymentMethod;
    console.log("[placeOrderHandler] The order info prepared is : ", order);
    dispatch(createOrder(order.toRawDict()));
  };
  return (
    <>
      <CheckoutSteps loginStep shippingStep paymentStep placeOrder />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                <br />
                <AddressCard shippingAddress={shippingAddress} />
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod.paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((cartItem, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={`${process.env.REACT_APP_SERVER_URL}/media/images/cart/${cartItem.productPrimaryImage}`}
                            alt={cartItem.productName}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${cartItem.productId}`}>
                            <strong>{cartItem.productName}</strong>
                          </Link>
                        </Col>
                        <Col md={4}>
                          {cartItem.qty} x &#8377;{" "}
                          {cartItem.productSellingPrice} =
                          <strong>
                            {" "}
                            &#8377;{" "}
                            {cartItem.qty * cartItem.productSellingPrice}
                          </strong>
                        </Col>
                      </Row>
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
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col> &#8377;{itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col> &#8377;{shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col> &#8377;{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
              {error && <Message variant="danger">{error}</Message>}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
              >
                Place Order
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default PlaceOrderScreen;
