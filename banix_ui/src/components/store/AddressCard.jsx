import React from "react";
import { Card } from "react-bootstrap";

const AddressCard = ({ shippingAddress }) => {
  console.log("[AddressCard] The shipping Address is ::: ", shippingAddress);
  return (
    <Card key={shippingAddress.addressId} style={{ width: "20rem" }}>
      <Card.Body>
        <Card.Title>{shippingAddress.fullName}</Card.Title>
        <Card.Text>
          <span>{shippingAddress.buildingInfo}</span>
          <br />
          <span>{shippingAddress.streetInfo}</span> <br />
          <span>
            {shippingAddress.cityInfo}
            {", "}
            {shippingAddress.stateInfo} {shippingAddress.pinCode}
          </span>{" "}
          <br />
          <span>Phone Number : {shippingAddress.mobileNumber}</span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default AddressCard;
