import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";

import CheckoutSteps from "../components/store/CheckoutSteps";
import AddressCard from "../components/store/AddressCard";
import { fetchOderInfo } from "../actions/orderActions";
import { createOrder } from "../actions/orderActions";
import { Order } from "../schema/order";

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("[PlaceOrderScreen] The cart object is : ", cart);

  const { cartItems, shippingAddress, paymentMethod } = cart;
  useEffect(
    () => {
      dispatch(fetchOderInfo(cartItems, shippingAddress));
    }, // eslint-disable-next-line
    []
  );

  const orderInfoPrepared = useSelector((state) => state.orderPrepare);
  console.log(
    "[PlaceOrderScreen] the order info prepared is ::: ",
    orderInfoPrepared
  );
  const {
    orderInfo,
    loading: orderDetailsLoading,
    error: orderDetailsError,
  } = orderInfoPrepared;

  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    order,
    success: orderCreationSuccess,
    error: orderCreationError,
  } = orderCreate;

  useEffect(() => {
    if (orderCreationSuccess) {
      // history.push(`/order/${order.orderId}`);
      console.log(
        "[PlaceOrderScreen] on success :",
        order,
        orderCreationSuccess
      );
    }
    // eslint-disable-next-line
  }, [history, orderCreationSuccess]);

  const placeOrderHandler = () => {
    const order = new Order();
    order.orderItems = cartItems;
    order.orderShippingInfo = shippingAddress;
    order.orderPaymentType = paymentMethod;
    console.log("[placeOrderHandler] The order info prepared is : ", order);
    dispatch(createOrder(order.toRawDict(), orderInfo));
  };

  return (
    <>
      {orderDetailsLoading ? (
        <Loader />
      ) : orderDetailsError ? (
        <Message variant="danger">{orderDetailsError}</Message>
      ) : (
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
                  </p>
                  <AddressCard shippingAddress={shippingAddress} />
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment Method</h2>
                  <p>
                    <strong>Method: </strong>
                    {paymentMethod.paymentMethod}
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
                                src={`/media/images/cart/${cartItem.productPrimaryImage}`}
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
                      <Col md={6}>Items Price</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377;{orderInfo.totalSellingPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Shipping</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377;
                          {orderInfo.totalShippingPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Tax</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377;{orderInfo.totalTaxPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Total</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377;{orderInfo.totalPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>

                {orderCreationError && (
                  <ListGroup.Item>
                    <Message variant="danger">{orderCreationError}</Message>
                  </ListGroup.Item>
                )}

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
      )}
    </>
  );
};

export default PlaceOrderScreen;
