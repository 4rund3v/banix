import React from "react";
import CustomerAddress from "../store/CustomerAddress";
import AddressCard from "../store/AddressCard";

const UpdateShippingInfo = () => {
  const customerShippingAddresses = [];
  return (
    <>
      <h2>Shipping Address Options</h2>
      {customerShippingAddresses.length > 0 ? (
        customerShippingAddresses.map((shippingAddress, idx) => (
          <AddressCard key={idx} shippingAddress={shippingAddress} />
        ))
      ) : (
        <div>
          <span>Enter Shipping Details</span>
          <CustomerAddress />
        </div>
      )}
    </>
  );
};

export default UpdateShippingInfo;
