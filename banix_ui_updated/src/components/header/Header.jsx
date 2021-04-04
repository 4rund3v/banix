// react
import React from "react";

// third-party
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// application
import NavPanel from "./NavPanel";
import Search from "./Search";
import { LogoSvg } from "../../svg";

function Header(props) {
  const { layout } = props;
  const bannerSection = (
    <div className="site-header__middle container">
      <div className="site-header__logo ">
        <Link to="/">
          <LogoSvg width="100%" />
        </Link>
      </div>
      <div className="site-header__search">
        <Search context="header" />
      </div>
      <div className="site-header__phone">
        <div>
          <Link
            to="/shop/offers"
            className="btn btn-primary btn-lg ask-offer-long"
          >
            Offers
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="site-header">
      {bannerSection}
      <div className="site-header__nav-panel">
        <NavPanel layout={layout} />
      </div>
    </div>
  );
}

Header.propTypes = {
  /** one of ['default', 'compact'] (default: 'default') */
  layout: PropTypes.oneOf(["default", "compact"]),
};

Header.defaultProps = {
  layout: "default",
};

export default Header;
