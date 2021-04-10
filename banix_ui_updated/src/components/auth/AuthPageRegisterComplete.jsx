// react
import React, { useState, useEffect } from "react";
// third-party
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
//application
import PageHeader from "../shared/PageHeader";
import Message from "../shared/Message";
import BlockLoader from "../blocks/BlockLoader";
// import { register } from "../actions/customerActions";
import { auth } from "../../firebase";
import theme from "../../data/theme";

const AuthPageRegisterComplete = ({ location, history }) => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Register Complete", url: "" },
  ];
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const register = (email, password) => {
    console.log(
      "Registration request for the email id password ::: ",
      email,
      password
    );
  };
  const customerRegister = useSelector((state) => state.customerRegister);
  const { loading, error, customerInfo } = customerRegister || {};

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
      setMessage("Email not found!");
    } else if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
    } else {
      try {
        const result = await auth.signInWithEmailLink(
          email,
          window.location.href
        );
        if (result.user.emailVerified) {
          window.localStorage.removeItem("registerInfo");
          console.log(
            "[RegisterComplete][submitHandler]The current user is :: ",
            auth.currentUser
          );
          await auth.currentUser.updatePassword(password);
          //   dispatch(register(email, password));
          console.log(
            "[registration] The emial and the password are updated to firebase."
          );
        } else {
          setMessage("Unable to verify email, try again.");
        }
      } catch (error) {
        console.log("Unable to process the registration :: ", error);
        setMessage("Unable to complete registration, try again.");
      }
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Register — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="Complete Registration" breadcrumb={breadcrumb} />
      <div className="block">
        <Container>
          <Row className="justify-content-md-center">
            <Col xs={12} md={4}>
              {message && <Message variant="info">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {loading && <BlockLoader />}
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
                  <Link
                    to={
                      redirect
                        ? `/auth/login?redirect=${redirect}`
                        : "/auth/login"
                    }
                  >
                    Login
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default AuthPageRegisterComplete;
