import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { updateCustomerAddress } from "../../actions/customerActions";
import { CustomerAddress } from "../../schema/customer";
import Message from "../misc/Message";
import Loader from "../misc/Loader";

const UpdateCustomerAddress = ({ history, match, props }) => {
  console.log(
    "[UpdateCustomerAddress] In the customer address update screen ::: ",
    history,
    match,
    props
  );
  const address = {};
  const [fullName, setFullName] = useState(address.fullName);
  const [mobileNumber, setMobileNumber] = useState(address.fullName);
  const [pinCode, setPinCode] = useState(address.fullName);
  const [buildingInfo, setBuildingInfo] = useState(address.fullName);
  const [streetInfo, setStreetInfo] = useState(address.fullName);
  const [landmarkInfo, setLandmarkInfo] = useState(address.fullName);
  const [cityInfo, setCityInfo] = useState(address.fullName);
  const [stateInfo, setStateInfo] = useState(address.fullName);

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const modifiedAddress = new CustomerAddress();
    modifiedAddress.fullName = fullName;
    modifiedAddress.mobileNumber = mobileNumber;
    modifiedAddress.pinCode = pinCode;
    modifiedAddress.buildingInfo = buildingInfo;
    modifiedAddress.streetInfo = streetInfo;
    modifiedAddress.landmarkInfo = landmarkInfo;
    modifiedAddress.cityInfo = cityInfo;
    modifiedAddress.stateInfo = stateInfo;
    console.log(
      "[CreateCustomerAddress] Saving the shipping address.",
      modifiedAddress
    );
    dispatch(updateCustomerAddress(modifiedAddress));
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

export default UpdateCustomerAddress;
