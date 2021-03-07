import React from "react";
// third-party
import classNames from "classnames";
import { Link, matchPath, Redirect, Switch, Route } from "react-router-dom";
// application
import PageBreadcrumb from "../components/shared/PageBreadcrumb";

// pages
import AccountAddresses from "../components/customer/AccountAddresses";
import CreateCustomerAddress from "../components/customer/CreateCustomerAddress";
import UpdateCustomerAddress from "../components/customer/UpdateCustomerAddress";
import AccountDashboard from "../components/customer/AccountDashboard";
import AccountOrders from "../components/customer/AccountOrders";
import AccountPassword from "../components/customer/AccountPassword";
import AccountProfile from "../components/customer/AccountProfile";
import AccountOrderDetails from "../components/customer/AccountOrderDetails";

const CustomerAccountScreen = ({ match, location }) => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "My Account", url: "" },
  ];

  const links = [
    { title: "Dashboard", url: "dashboard" },
    { title: "Edit Profile", url: "profile" },
    { title: "Order History", url: "orders" },
    { title: "Order Details", url: "orders-details" },
    { title: "Addresses", url: "addresses" },
    { title: "Password", url: "password" },
    { title: "Logout", url: "login" },
  ].map((link) => {
    const url = `${match.url}/${link.url}`;
    const isActive = matchPath(location.pathname, { path: url });
    const classes = classNames("account-nav__item", {
      "account-nav__item--active": isActive,
    });

    return (
      <li key={link.url} className={classes}>
        <Link to={url}>{link.title}</Link>
      </li>
    );
  });

  return (
    <React.Fragment>
      <PageBreadcrumb header="My Account" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-3 d-flex">
              <div className="account-nav flex-grow-1">
                <h4 className="account-nav__title">Navigation</h4>
                <ul>{links}</ul>
              </div>
            </div>
            <div className="col-12 col-lg-9 mt-4 mt-lg-0">
              <Switch>
                <Redirect
                  exact
                  from={match.path}
                  to={`${match.path}/dashboard`}
                />
                <Route
                  exact
                  path={`${match.path}/dashboard`}
                  component={AccountDashboard}
                />
                <Route
                  exact
                  path={`${match.path}/profile`}
                  component={AccountProfile}
                />
                <Route
                  exact
                  path={`${match.path}/orders`}
                  component={AccountOrders}
                />
                <Route
                  exact
                  path={`${match.path}/orders-details/:id`}
                  component={AccountOrderDetails}
                />
                <Route
                  exact
                  path={`${match.path}/addresses`}
                  component={AccountAddresses}
                />
                <Route
                  exact
                  path={`${match.path}/addresses/add-address`}
                  component={CreateCustomerAddress}
                />
                <Route
                  exact
                  path={`${match.path}/addresses/update-address`}
                  component={UpdateCustomerAddress}
                />
                <Route
                  exact
                  path={`${match.path}/password`}
                  component={AccountPassword}
                />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CustomerAccountScreen;
