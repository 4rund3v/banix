import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId && qty) {
      console.log("[CartScreen] Adding to the cart: ", productId, qty);
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  console.log("[cartScreen] The cart info is ::: ", cartItems);
  return (
    <Row>
      <Col md={8}>
        <h2> Your Cart </h2>
        {cartItems.length === 0 ? (
          <Message variant="danger">
            Your Cart is empty, <Link to="/">Return to Store</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <Row
                key={cartItem.productId}
                className="h-100 justify-content-center align-items-center"
              >
                <Col md={2}>
                  <Image
                    src={`/media/images/cart/${cartItem.productPrimaryImage}`}
                    alt={cartItem.productName}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={4}>
                  <Link to={`/product/${cartItem.productId}`}>
                    <strong>{cartItem.productName}</strong>
                  </Link>
                </Col>
                <Col md={2}>
                  <strong> &#8377; {cartItem.productSellingPrice}</strong>
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={cartItem.qty}
                    onChange={(e) =>
                      dispatch(
                        addToCart(cartItem.productId, Number(e.target.value))
                      )
                    }
                  >
                    {[...Array(cartItem.productStock).keys()]
                      .slice(0, 10)
                      .map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                  </Form.Control>
                </Col>

                <Col md={2}>
                  {" "}
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(cartItem.productId)}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </Col>
              </Row>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card variant="flush">
          <ListGroup.Item>
            <h2>
              SUBTOTAL (
              {cartItems.reduce((acc, cartItem) => acc + cartItem.qty, 0)})
              ITEMS
            </h2>
          </ListGroup.Item>
          <ListGroup.Item>
            <span className="justify-content-center align-items-center">
              &#8377;{" "}
              {cartItems.reduce(
                (acc, cartItem) =>
                  acc + cartItem.productSellingPrice * cartItem.qty,
                0
              )}
            </span>
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={cartItems.length === 0}
              onClick={checkoutHandler}
            >
              Proceed to Checkout
            </Button>
          </ListGroup.Item>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
