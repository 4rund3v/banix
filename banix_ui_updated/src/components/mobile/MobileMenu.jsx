// react
import React from "react";

// third-party
import classNames from "classnames";
import { connect } from "react-redux";

// application
import MobileLinks from "./MobileLinks";
import { Cross20Svg } from "../../svg";

// data stubs
import currencies from "../../data/shopCurrencies";
import mobileMenuLinks from "../../data/mobileMenu";

const currencyChange = () => {};
const localeChange = () => {};
const mobileMenuClose = () => {};

function MobileMenu(props) {
  const { closeMobileMenu, changeLocale, changeCurrency } = props;
  const mobileMenuState = { open: false };
  const classes = classNames("mobilemenu", {
    "mobilemenu--open": mobileMenuState.open,
  });

  const handleItemClick = (item) => {
    if (item.data) {
      if (item.data.type === "language") {
        changeLocale(item.data.locale);
        closeMobileMenu();
      }
      if (item.data.type === "currency") {
        const currency = currencies.find(
          (x) => x.currency.code === item.data.code
        );

        if (currency) {
          changeCurrency(currency.currency);
          closeMobileMenu();
        }
      }
    }
    if (item.type === "link") {
      closeMobileMenu();
    }
  };

  return (
    <div className={classes}>
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className="mobilemenu__backdrop" onClick={closeMobileMenu} />
      <div className="mobilemenu__body">
        <div className="mobilemenu__header">
          <div className="mobilemenu__title">Menu</div>
          <button
            type="button"
            className="mobilemenu__close"
            onClick={closeMobileMenu}
          >
            <Cross20Svg />
          </button>
        </div>
        <div className="mobilemenu__content">
          <MobileLinks links={mobileMenuLinks} onItemClick={handleItemClick} />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  mobileMenuState: state.mobileMenu,
});

const mapDispatchToProps = {
  closeMobileMenu: mobileMenuClose,
  changeLocale: localeChange,
  changeCurrency: currencyChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
