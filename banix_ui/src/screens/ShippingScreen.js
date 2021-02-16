import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import FormContainer from "../components/misc/FormContainer";
import CheckoutSteps from "../components/store/CheckoutSteps";
import CustomerAddress from "../components/store/CustomerAddress";
const ShippingScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const onSubmitHandler = (e) => {
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps loginStep shippingStep></CheckoutSteps>
      <h1>Shipping</h1>
      <CustomerAddress
        shippingAddress={shippingAddress}
        onSubmitHandler={onSubmitHandler}
      />
    </FormContainer>
  );
};

export default ShippingScreen;
