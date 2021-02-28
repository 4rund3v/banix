import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const AddressCard = ({ address, history }) => {
  console.log("[AddressCard] address", history);
  const editHandler = () => {
    // history.push("/account/addresses/update-address");
  };
  return (
    <React.Fragment key={address.id}>
      <div className="address-card__body">
        <div className="address-card__name">{`${address.fullName}`}</div>
        <div className="address-card__row">
          {address.buildingInfo}
          <br />
          {address.streetInfo}
          <br />
          {address.cityInfo}, {address.stateInfo} {" - "}
          {address.pinCode},
        </div>
        <div className="address-card__row">
          <div className="address-card__row-title">Phone Number</div>
          <div className="address-card__row-content">
            {address.mobileNumber}
          </div>
        </div>
        <div className="address-card__footer">
          <Button
            className="mr-2"
            variant="outline-info"
            size="sm"
            onClick={editHandler}
          >
            Edit
          </Button>
          <Button className="mr-2" variant="outline-info" size="sm">
            Remove
          </Button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressCard;
