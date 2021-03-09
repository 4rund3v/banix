import React, { useEffect } from "react";
// third-party
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerAddress } from "../../actions/customerActions";
import AddressCard from "./AddressCard";

const AccountAddresses = ({ match }) => {
  const dispatch = useDispatch();

  const customerAddress = useSelector((state) => state.customerAddress);
  const { addresses } = customerAddress;
  useEffect(() => {
    dispatch(getCustomerAddress());
  }, [dispatch]);

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
      {addresses.map((addressItem) => {
        return (
          <div className="addresses-list__item card address-card">
            <AddressCard address={addressItem} />
            <div className="addresses-list__divider" />
          </div>
        );
      })}
    </div>
  );
};

export default AccountAddresses;
