import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import FormContainer from "../components/misc/FormContainer";
import { register } from "../actions/customerActions";
import { auth } from "../firebase";

const RegisterCompleteScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();

  const cusomerRegister = useSelector((state) => state.customerRegister);
  const { loading, error, customerInfo } = cusomerRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    const registrationInfo = localStorage.getItem("registerInfo")
      ? JSON.parse(localStorage.getItem("registerInfo"))
      : { registrationEmailId: "" };
    setEmail(registrationInfo.registrationEmailId);
  }, []);
  useEffect(() => {
    if (customerInfo && customerInfo.customerId) {
      history.push(redirect);
    }
  }, [history, customerInfo, redirect]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Emial not found!");
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      try {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        if (result.user.emailVerified) {
          dispatch(register(email, password));
        } else {
          setMessage("Unable to verify email, try again.");
        }
      } catch (error) {
        console.log("Unable to process the registration", error);
        setMessage("Unable to complete registration, try again.");
      }
    }
  };

  return (
    <div>
      <FormContainer>
        <h1> Sign Up</h1>
        {message && <Message variant="info">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              disabled={true}
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
          <Form.Group controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Register
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            Existing Customer ? {""}
            <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </div>
  );
};

export default RegisterCompleteScreen;
