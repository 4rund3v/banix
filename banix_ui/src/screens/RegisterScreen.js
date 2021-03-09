import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/misc/FormContainer";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import Message from "../components/misc/Message";

const RegisterScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. Click the link to complete registration`
    );
    setMessage(
      `Email sent to ${email}. Click the link to complete registration.`
    );
    localStorage.setItem(
      "registerInfo",
      JSON.stringify({ registrationEmailId: email })
    );
  };

  return (
    <div>
      <ToastContainer />
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant="info">{message}</Message>}

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
          <Button type="submit" variant="primary">
            Click to Register
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

export default RegisterScreen;
