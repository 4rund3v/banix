import React from "react";
// third-party
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const AccountAddresses = ({ match }) => {
  const addresses = [];
  return (
    <div className="addresses-list">
      <Helmet>
        <title>{`Address List — Banix`}</title>
      </Helmet>

      <Link
        to={`${match.path}/add-address`}
        className="addresses-list__item addresses-list__item--new"
      >
        <div className="addresses-list__plus" />
        <div className="btn btn-secondary btn-sm">Add New</div>
      </Link>
      <div className="addresses-list__divider" />
      {addresses}
    </div>
  );
};

export default AccountAddresses;
