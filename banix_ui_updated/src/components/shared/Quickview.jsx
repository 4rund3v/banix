// react
import React from "react";

// third-party
// import { connect } from "react-redux";
import { Modal } from "reactstrap";

// application
import Product from "./Product";
import { Cross20Svg } from "../../svg";
// import { quickviewClose } from "../../store/quickview";

const quickviewClose = () => {
  console.log("[quickviewClose] Invoked to close the quick view");
};

const Quickview = ({ product, open, quickviewClose }) => {
  let productView;

  if (product !== null) {
    productView = <Product product={product} layout="quickview" />;
  }
  return (
    <Modal isOpen={open} toggle={quickviewClose} centered size="xl">
      <div className="quickview">
        <button
          className="quickview__close"
          type="button"
          onClick={quickviewClose}
        >
          <Cross20Svg />
        </button>

        {productView}
      </div>
    </Modal>
  );
};

export default Quickview;
