import React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";

import {
  getCustomerDetails,
  updateCustomerPassword,
} from "../../actions/customerActions";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import { useState, useEffect } from "react";

const AccountPassword = ({ history }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState(null);

  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  console.log("[ProfileScreen] the customerInfo is : ", customerInfo);

  const customerDetails = useSelector((state) => state.customerDetails);
  const { loading, error, customer } = customerDetails;
  console.log("[AccountPassword] the customerDetails is : ", customer);

  const customerPasswordUpdate = useSelector(
    (state) => state.customerPasswordUpdate
  );
  const { success } = customerPasswordUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password && newPassword !== confirmNewPassword) {
      setMessage("Passwords do not match");
    } else {
      // DISPATCH customer profile update
      dispatch(
        updateCustomerPassword({
          password: password,
          new_password: newPassword,
        })
      );
    }
  };

  useEffect(() => {
    if (!customerInfo) {
      history.push("/login");
    } else {
      if (!customer.username) {
        console.log("[profileScreen] Fetching the customer Details");
        dispatch(getCustomerDetails());
      }
    }
  }, []);

  return (
    <Card>
      <Helmet>
        <title>{`Update Password — Banix`}</title>
      </Helmet>
      <div className="card-header">
        <h5>Update Password</h5>
      </div>
      <div className="card-divider"> </div>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Password Updated</Message>}
      {loading && <Loader />}
      {!error && (
        <Card.Body>
          <Row className="no-gutters">
            <Col className="col-12 col-lg-7 col-xl-6">
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="password">
                  <Form.Label>Current Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="new-password">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="confirm-new-password">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Update Password
                </Button>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      )}
    </Card>
  );
};

export default AccountPassword;
