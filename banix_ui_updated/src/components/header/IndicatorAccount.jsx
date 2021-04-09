// react
import React from "react";

// third-party
import { Link } from "react-router-dom";

// application
import Indicator from "./Indicator";
import { MaleAvatarSvg, Person20Svg } from "../../svg";

export default function IndicatorAccount() {
  const dropdown = (
    <div className="account-menu">
      <Link to="/account/dashboard" className="account-menu__user">
        <div className="account-menu__user-avatar">
          <MaleAvatarSvg />
        </div>
        <div className="account-menu__user-info">
          <div className="account-menu__user-name">UserName</div>
          <div className="account-menu__user-email">email@address.com</div>
        </div>
      </Link>
      <div className="account-menu__divider" />
      <ul className="account-menu__links">
        <li>
          <Link to="/account/profile">Edit Profile</Link>
        </li>
        <li>
          <Link to="/account/orders">Account Orders</Link>
        </li>
        <li>
          <Link to="/account/addresses">Addresses</Link>
        </li>
        <li>
          <Link to="/account/password">Password</Link>
        </li>
      </ul>
      <div className="account-menu__divider" />
      <ul className="account-menu__links">
        <li>
          <Link to="/account/login">Logout</Link>
        </li>
      </ul>
    </div>
  );

  return (
    <Indicator url="/account" dropdown={dropdown} icon={<Person20Svg />} />
  );
}
