import React from "react";
import { useSelector } from "react-redux";
import FormContainer from "../components/misc/FormContainer";
import CheckoutSteps from "../components/store/CheckoutSteps";
import CustomerAddress from "../components/store/CustomerAddress";

const ShippingScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);

  const onSubmitHandler = (e) => {
    history.push("/place-order");
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
