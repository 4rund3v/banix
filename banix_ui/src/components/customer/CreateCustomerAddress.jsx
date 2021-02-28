import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { createCustomerAddress } from "../../actions/customerActions";
import { CustomerAddress } from "../../schema/customer";
import Message from "../misc/Message";
import Loader from "../misc/Loader";

const CreateCustomerAddress = ({ history, match, props }) => {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [buildingInfo, setBuildingInfo] = useState("");
  const [streetInfo, setStreetInfo] = useState("");
  const [landmarkInfo, setLandmarkInfo] = useState("");
  const [cityInfo, setCityInfo] = useState("");
  const [stateInfo, setStateInfo] = useState("");

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const newShippingAddress = new CustomerAddress();
    newShippingAddress.fullName = fullName;
    newShippingAddress.mobileNumber = mobileNumber;
    newShippingAddress.pinCode = pinCode;
    newShippingAddress.buildingInfo = buildingInfo;
    newShippingAddress.streetInfo = streetInfo;
    newShippingAddress.landmarkInfo = landmarkInfo;
    newShippingAddress.cityInfo = cityInfo;
    newShippingAddress.stateInfo = stateInfo;
    console.log(
      "[CreateCustomerAddress] Saving the shipping address.",
      newShippingAddress
    );
    dispatch(createCustomerAddress(newShippingAddress));
    history.push("/account/dashboard");
  };

  return (
    <Container fluid>
      <Row>
        <Col xs={6}>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="fullName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={fullName}
                required
                onChange={(e) => setFullName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="mobileNumber">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder=""
                value={mobileNumber}
                required
                onChange={(e) => setMobileNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
              <Form.Label>PinCode</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={pinCode}
                required
                onChange={(e) => setPinCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="buildingInfo">
              <Form.Label>House No, Flat, Building </Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={buildingInfo}
                required
                onChange={(e) => setBuildingInfo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="steetInfo">
              <Form.Label>Area, Colony, Street</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={streetInfo}
                required
                onChange={(e) => setStreetInfo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="landMark">
              <Form.Label>LandMark</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={landmarkInfo}
                onChange={(e) => setLandmarkInfo(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
              <Form.Label>Town / City</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={cityInfo}
                required
                onChange={(e) => setCityInfo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="state">
              <Form.Label>State / Province</Form.Label>
              <Form.Control
                type="text"
                placeholder=""
                value={stateInfo}
                required
                onChange={(e) => setStateInfo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button className="float-right" type="submit" variant="primary">
              Save Address
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateCustomerAddress;
