// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import dataAddresses from "../../data/accountAddresses";
import theme from "../../data/theme";

const AccountPageAddresses = () => {
  const addresses = dataAddresses.map((address) => (
    <React.Fragment key={address.id}>
      <div className="addresses-list__item card address-card">
        {address.default && <div className="address-card__badge">Default</div>}

        <div className="address-card__body">
          <div className="address-card__name">{`${address.firstName} ${address.lastName}`}</div>
          <div className="address-card__row">
            {address.country}
            <br />
            {address.postcode},{address.city}
            <br />
            {address.address}
          </div>
          <div className="address-card__row">
            <div className="address-card__row-title">Phone Number</div>
            <div className="address-card__row-content">{address.phone}</div>
          </div>
          <div className="address-card__row">
            <div className="address-card__row-title">Email Address</div>
            <div className="address-card__row-content">{address.email}</div>
          </div>
          <div className="address-card__footer">
            <Link to="/account/addresses/5">Edit Address</Link>
            &nbsp;&nbsp;
            {/* <Link to="/">Edit</Link> */}
          </div>
        </div>
      </div>
      <div className="addresses-list__divider" />
    </React.Fragment>
  ));
  return (
    <div className="addresses-list">
      <Helmet>
        <title>{`Address List — ${theme.name}`}</title>
      </Helmet>

      {addresses}
    </div>
  );
};

export default AccountPageAddresses;
