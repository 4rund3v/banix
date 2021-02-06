import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartActions";
import FormContainer from "../components/misc/FormContainer";
import CheckoutSteps from "../components/store/CheckoutSteps";

const PaymentScreen = ({ history }) => {
  const shippingAddress = useSelector((state) => state.cart.shippingAddress);
  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState(null);
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Saving the payment method.");
    dispatch(
      savePaymentMethod({
        paymentMethod,
      })
    );
    history.push("/place-order");
  };

  return (
    <FormContainer>
      <CheckoutSteps loginStep shippingStep paymentStep></CheckoutSteps>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend"> Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="UPI"
              id="UPI"
              name="paymentMethod"
              value="UPI"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Net Banking"
              id="netBanking"
              name="paymentMethod"
              value="netBanking"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
            <Form.Check
              type="radio"
              label="Card"
              id="Card"
              name="paymentMethod"
              value="Card"
              onChange={(e) => {
                setPaymentMethod(e.target.value);
              }}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
