import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "../components/misc/FormContainer";

const ShippingScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const [address, setAddress] = useState(
    shippingAddress.address ? shippingAddress.address : ""
  );
  const [city, setCity] = useState(
    shippingAddress.city ? shippingAddress.city : ""
  );
  const [state, setState] = useState(
    shippingAddress.state ? shippingAddress.state : ""
  );
  const [landMark, setLandMark] = useState(
    shippingAddress.landMark ? shippingAddress.landMark : ""
  );
  const [pinCode, setPinCode] = useState(
    shippingAddress.pinCode ? shippingAddress.pinCode : ""
  );
  const [mobileNumber, setMobileNumber] = useState(
    shippingAddress.mobileNumber
  );
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Saving the shipping address.");
    dispatch(
      saveShippingAddress({
        address,
        city,
        state,
        mobileNumber,
        state,
        landMark,
        pinCode,
      })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="landMark">
          <Form.Label>LandMark</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Nearby LandMark"
            value={landMark}
            onChange={(e) => setLandMark(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>PinCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Pin Code"
            value={pinCode}
            required
            onChange={(e) => setPinCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter State"
            value={state}
            required
            onChange={(e) => setState(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="mobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            required
            onChange={(e) => setMobileNumber(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
