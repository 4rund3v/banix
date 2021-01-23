import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import { Link } from "react-router-dom";
import { IMAGE_URL, PRODUCT_SPECIFIC_URL } from "../config";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart } from "../actions/cartActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (productId && qty) {
      console.log("adding to the cart: ", productId, qty);
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (productId) => {};

  return (
    <Row>
      <Col md={8}>
        <h2> Your Cart</h2>
        {cartItems.length === 0 ? (
          <Message>
            {" "}
            Your Cart is empty, <Link to="/">Return to Home</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((cartItem) => (
              <Row>
                <Col md={2}>
                  <Image
                    src={`${IMAGE_URL}${cartItem.productImage}`}
                    alt={cartItem.productName}
                    fluid
                    rounded
                  />
                </Col>
                <Col md={4}>
                  <Link to={`${PRODUCT_SPECIFIC_URL}/${cartItem.productId}`}>
                    {cartItem.productName}
                  </Link>
                </Col>
                <Col md={2}> &#8377; {cartItem.productPrice}</Col>
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
      <Col md={2}></Col>
      <Col md={2}></Col>
    </Row>
  );
};

export default CartScreen;
