// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import CartIndicator from "./IndicatorCart";
import Departments from "./Departments";
import Indicator from "./Indicator";
import IndicatorAccount from "./IndicatorAccount";
import IndicatorSearch from "./IndicatorSearch";
import NavLinks from "./NavLinks";
import { Heart20Svg, LogoSmallSvg } from "../../svg";

const NavPanel = ({ layout }) => {
  const wishlist = [];
  let logo = null;
  let departments = (
    <div className="nav-panel__departments">
      <Departments />
    </div>
  );
  let searchIndicator;

  searchIndicator = <IndicatorSearch />;

  return (
    <div className="nav-panel">
      <div className="nav-panel__container container">
        <div className="nav-panel__row">
          {departments}
          <div className="nav-panel__nav-links nav-links">
            <NavLinks />
          </div>
          <div className="nav-panel__indicators">
            {searchIndicator}

            <Indicator
              url="/shop/wishlist"
              value={wishlist.length}
              icon={<Heart20Svg />}
            />

            <CartIndicator />

            <IndicatorAccount />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavPanel;
