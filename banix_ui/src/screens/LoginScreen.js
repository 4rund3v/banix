import React, { useState, useEffect } from "react";
// third
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Form, Row, Col, Button } from "react-bootstrap";
// components
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import FormContainer from "../components/misc/FormContainer";
// actions
import { login } from "../actions/customerActions";

const LoginScreen = ({ location, history }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const customerLogin = useSelector((state) => state.customerLogin);
  const { loading, error, customerInfo } = customerLogin;
  let redirect = location.search ? location.search.split("=")[1] : "/";

  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  if (redirect === "shipping") {
    if (shippingAddress && shippingAddress.pinCode) {
      redirect = "place-order";
    } else {
      redirect = "shipping";
    }
  }
  useEffect(() => {
    if (customerInfo && customerInfo.customerId) {
      history.push(redirect);
    }
  }, [history, customerInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New Customer ?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register Here
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
