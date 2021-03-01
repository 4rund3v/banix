import React, { useEffect } from "react";
// thrid party
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//components
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import CheckoutSteps from "../components/store/CheckoutSteps";
import ShippingAddressCard from "../components/store/ShippingAddressCard";
// actions
import { fetchOderInfo } from "../actions/orderActions";
import { createOrder } from "../actions/orderActions";
// data schema
import { Order } from "../schema/order";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log("[PlaceOrderScreen] The cart object is : ", cart);

  const { cartItems, shippingAddress } = cart;
  useEffect(
    () => {
      dispatch(fetchOderInfo(cartItems, shippingAddress));
    }, // eslint-disable-next-line
    []
  );

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  // console.log("[PlaceOrderScreen] The customerInfo object is : ", customerInfo);

  const orderInfoPrepared = useSelector((state) => state.orderPrepare);
  // console.log(
  //   "[PlaceOrderScreen] the order info prepared is ::: ",
  //   orderInfoPrepared
  // );
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

  const displayRazorPay = async () => {
    const res = await loadScript(
      `https://checkout.razorpay.com/v1/checkout.js`
    );
    if (!res) {
      alert(`Unable to ping payment gatewat. Are you online ?`);
      return;
    }
    // console.log("The orderinfo payment info is", orderInfo.paymentInfo);
    const options = {
      key: "rzp_test_1VGt9vNNSuXQ5X",
      amount: orderInfo.paymentInfo.amount,
      currency: orderInfo.paymentInfo.currency,
      name: "Banix",
      description: `Product Purchase`,
      image: "https://example.com/your_logo",
      order_id: orderInfo.paymentInfo.paymentOrderId,
      prefill: {
        name: customerInfo.displayName,
        email: customerInfo.emailId,
        contact: customerInfo.primaryMobileNumber || null,
      },
    };
    console.log("[displayRazorPay] options prepared is ::", options);
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  useEffect(() => {
    if (orderCreationSuccess) {
      console.log("[PlaceOrderScreen] on success ", order);
      if (order) {
        //   history.push(`/order/${order.orderId}`);
        displayRazorPay();
      }
    }
    // eslint-disable-next-line
  }, [history, orderCreationSuccess]);

  const placeOrderHandler = () => {
    const order = new Order();
    order.orderInfoId = orderInfo.orderInfoId;
    order.orderItems = cartItems;
    order.orderPrice = {
      totalShippingPrice: orderInfo.totalShippingPrice,
      totalSellingPrice: orderInfo.totalSellingPrice,
      totalTaxPrice: orderInfo.totalTaxPrice,
      totalPrice: orderInfo.totalPrice,
    };
    orderInfo.productPriceInfo.map((productPriceInfo) => {
      order.orderItemPriceInfo.push({
        productId: productPriceInfo.productId,
        sellingPrice: productPriceInfo.sellingPrice,
        shippingPrice: productPriceInfo.shippingPrice,
        taxPrice: productPriceInfo.taxPrice,
        totalPrice: productPriceInfo.totalPrice,
      });
      return null;
    });
    order.orderShippingAddress = shippingAddress;
    order.orderPaymentInfo = {
      paymentGateway: "RazorPay",
      paymentTransactionId: Date.now(),
    };
    console.log("[placeOrderHandler] The order info prepared is : ", order);
    dispatch(createOrder(order.toRawDict()));
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
                  <ShippingAddressCard shippingAddress={shippingAddress} />
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
                          &#8377; {orderInfo.totalSellingPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Shipping</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377; {orderInfo.totalShippingPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Tax</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377; {orderInfo.totalTaxPrice}
                        </span>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col md={6}>Total</Col>
                      <Col md={4}>
                        <span className="font-weight-bold text-right">
                          &#8377; {orderInfo.totalPrice}
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
