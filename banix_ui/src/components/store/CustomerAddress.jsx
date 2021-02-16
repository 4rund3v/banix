import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../../actions/cartActions";

const CustomerAddress = ({ shippingAddress, onSubmitHandler }) => {
  if (!shippingAddress) {
    shippingAddress = {};
  }
  const [fullName, setFullName] = useState(
    shippingAddress.fullName ? shippingAddress.fullName : ""
  );
  const [mobileNumber, setMobileNumber] = useState(
    shippingAddress.mobileNumber ? shippingAddress.mobileNumber : ""
  );
  const [pinCode, setPinCode] = useState(
    shippingAddress.pinCode ? shippingAddress.pinCode : ""
  );
  const [buildingInfo, setBuildingInfo] = useState(
    shippingAddress.buildingInfo ? shippingAddress.buildingInfo : ""
  );
  const [streetInfo, setStreetInfo] = useState(
    shippingAddress.streetInfo ? shippingAddress.streetInfo : ""
  );
  const [landMarkInfo, setLandMarkInfo] = useState(
    shippingAddress.landMarkInfo ? shippingAddress.landMarkInfo : ""
  );
  const [cityInfo, setCityInfo] = useState(
    shippingAddress.cityInfo ? shippingAddress.cityInfo : ""
  );
  const [stateInfo, setStateInfo] = useState(
    shippingAddress.stateInfo ? shippingAddress.stateInfo : ""
  );

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    const addressInfo = {
      full_name: fullName,
      mobile_number: mobileNumber,
      pincode: pinCode,
      building_info: buildingInfo,
      street_info: streetInfo,
      landmark_info: landMarkInfo,
      city_info: cityInfo,
      state_info: stateInfo,
    };
    console.log("[CustomerAddress] Saving the shipping address.", addressInfo);
    dispatch(saveShippingAddress(addressInfo));
    if (onSubmitHandler) {
      onSubmitHandler();
    }
  };

  return (
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
          value={landMarkInfo}
          onChange={(e) => setLandMarkInfo(e.target.value)}
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
      <Button type="submit" variant="primary">
        Continue
      </Button>
    </Form>
  );
};

export default CustomerAddress;
