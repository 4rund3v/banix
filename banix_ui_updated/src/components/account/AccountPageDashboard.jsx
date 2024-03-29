// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// data stubs
import addresses from "../../data/accountAddresses";
import allOrders from "../../data/accountOrders";
import theme from "../../data/theme";
import { MaleAvatarSvg } from "../../svg";

const AccountPageDashboard = () => {
  const address = addresses[0];
  const orders = allOrders.slice(0, 3).map((order) => (
    <tr key={order.id}>
      <td>
        <Link to="/account/orders/5">#{order.id}</Link>
      </td>
      <td>{order.date}</td>
      <td>{order.status}</td>
      <td>{order.total}</td>
    </tr>
  ));
  return (
    <div className="dashboard">
      <Helmet>
        <title>{`My Account — ${theme.name}`}</title>
      </Helmet>

      <div className="dashboard__profile card profile-card">
        <div className="card-body profile-card__body">
          <div className="profile-card__avatar">
            <MaleAvatarSvg />
          </div>
          <div className="profile-card__name">Username Here</div>
          <div className="profile-card__email">user@emailaddress.com</div>
          <div className="profile-card__edit">
            <Link to="profile" className="btn btn-secondary btn-sm">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard__address card address-card address-card--featured">
        {address.default && <div className="address-card__badge">Address</div>}
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
          </div>
        </div>
      </div>
      <div className="dashboard__orders card">
        <div className="card-header">
          <h5>Recent Orders</h5>
        </div>
        <div className="card-divider" />
        <div className="card-table">
          <div className="table-responsive-sm">
            <table>
              <thead>
                <tr>
                  <th>OrderID</th>
                  <th>Data</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>{orders}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPageDashboard;
