import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import {
  getCustomerDetails,
  updateCustomerDetails,
} from "../actions/customerActions";

const ProfileScreen = ({ locaiton, history }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  console.log("[ProfileScreen] the customerInfo is : ", customerInfo);

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
  console.log("[ProfileScreen] the customerDetails is : ", customer);

  const customerDetailsUpdate = useSelector(
    (state) => state.customerDetailsUpdate
  );
  const { success } = customerDetailsUpdate;

  useEffect(() => {
    if (!customerInfo) {
      history.push("/login");
    } else {
      if (!customer.username) {
        dispatch(getCustomerDetails());
      } else {
        if (customer.display_name) {
          setDisplayName(customer.display_name);
        }
        if (customer.primary_mobile_number) {
          setMobileNumber(customer.primary_mobile_number);
        }
      }
    }
  }, [dispatch, history, customerInfo, customer]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      // DISPATCH customer profile update
      dispatch(
        updateCustomerDetails({
          display_name: displayName,
          primary_mobile_number: mobileNumber,
        })
      );
    }
  };

  return (
    <Row>
      <Col md={6}>
        <h2> Update {displayName}'s Profile</h2>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {success && <Message variant="success">Profile Updated</Message>}
        {loading && <Loader />}
        {!error && (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="mobileNumber">
              <Form.Label>User Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
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
              Update Profile
            </Button>
          </Form>
        )}
      </Col>
      <Col md={6}>
        <h2>Shipping Addresses</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
