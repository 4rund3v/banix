import React from "react";
import { Link } from "react-router-dom";
const AddressCard = ({ address }) => {
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
          <Link to="/">Edit</Link>
          &nbsp;&nbsp;
          <Link to="/">Remove</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressCard;
