import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import {
  getCustomerDetails,
  updateCustomerDetails,
} from "../../actions/customerActions";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import { useState, useEffect } from "react";

const AccountProfile = ({ history }) => {
  const dispatch = useDispatch();
  const [displayName, setDisplayName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState(null);
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
        console.log("[AccountProfile] Fetching the customer Details");
        dispatch(getCustomerDetails());
      } else {
        if (customer.displayName) {
          setDisplayName(customer.displayName);
        }
        if (customer.primaryMobileNumber) {
          setMobileNumber(customer.primaryMobileNumber);
        }
      }
    }
  }, [dispatch, history, customerInfo, customer]);
  const submitHandler = (e) => {
    e.preventDefault();
    // DISPATCH customer profile update
    dispatch(
      updateCustomerDetails({
        display_name: displayName,
        primary_mobile_number: mobileNumber,
      })
    );
  };

  return (
    <Card>
      <Helmet>
        <title>{`Profile — Banix`}</title>
      </Helmet>
      <div className="card-header">
        <h5>Edit Profile</h5>
      </div>
      <div className="card-divider"> </div>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading && <Loader />}
      {!error && (
        <Card.Body>
          <Row className="no-gutters">
            <Col className="col-12 col-lg-7 col-xl-6">
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="mobileNumber">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    pattern="[0-9]{10}"
                    placeholder="Enter Mobile Number"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" className="mt-2 mb-0">
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      )}
    </Card>
  );
};

export default AccountProfile;
