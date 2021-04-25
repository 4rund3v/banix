// react
import React from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import Rating from "./Rating";

import { Compare16Svg, Quickview16Svg, Wishlist16Svg } from "../../svg";
// functions to add to the redux store
// import { cartAddItem } from "../../store/cart";
// import { compareAddItem } from "../../store/compare";
// import { quickviewOpen } from "../../store/quickview";
// import { wishlistAddItem } from "../../store/wishlist";
import { url } from "../../services/utils";

const cartAddItem = () => {
  console.log("[ProductCard] [cartAddItem] Invoked the cartAddItem ");
};

const compareAddItem = () => {
  console.log("[ProductCard] [compareAddItem] Invoked the compareAddItem ");
};

const quickviewOpen = () => {
  console.log("[ProductCard] [quickviewOpen] Invoked the quickviewOpen ");
};

const wishlistAddItem = () => {
  console.log("[ProductCard] [wishlistAddItem] Invoked the wishlistAddItem ");
};

function ProductCard(props) {
  const {
    product,
    layout,
    quickviewOpen,
    cartAddItem,
    wishlistAddItem,
    compareAddItem,
  } = props;
  const containerClasses = classNames("product-card", {
    "product-card--layout--grid product-card--size--sm": layout === "grid-sm",
    "product-card--layout--grid product-card--size--nl": layout === "grid-nl",
    "product-card--layout--grid product-card--size--lg": layout === "grid-lg",
    "product-card--layout--list": layout === "list",
    "product-card--layout--horizontal": layout === "horizontal",
  });

  let badges = [];
  let image;
  let price;
  let features;

  if (product.productBadges.includes("sale")) {
    badges.push(
      <div key="sale" className="product-card__badge product-card__badge--sale">
        Sale
      </div>
    );
  }
  if (product.productBadges.includes("hot")) {
    badges.push(
      <div key="hot" className="product-card__badge product-card__badge--hot">
        Hot
      </div>
    );
  }
  if (product.productBadges.includes("new")) {
    badges.push(
      <div key="new" className="product-card__badge product-card__badge--new">
        New
      </div>
    );
  }

  badges = badges.length ? (
    <div className="product-card__badges-list">{badges}</div>
  ) : null;

  if (product.productPrimaryImage) {
    image = (
      <div className="product-card__image product-image">
        <Link to={url.product(product)} className="product-image__body">
          <img
            className="product-image__img"
            src={`/media/images/cart/${product.productPrimaryImage}`}
            alt=""
          />
        </Link>
      </div>
    );
  }

  if (product.productSellingPrice) {
    price = (
      <div className="product-card__prices">
        <span className="product-card__new-price">
          <Currency value={product.productSellingPrice} />
        </span>{" "}
        <span className="product-card__old-price">
          <Currency value={product.productCostPrice} />
        </span>
      </div>
    );
  } else {
    price = (
      <div className="product-card__prices">
        <Currency value={product.productCostPrice} />
      </div>
    );
  }

  if (product.productAttributes && product.productAttributes.length) {
    features = (
      <ul className="product-card__features-list">
        {product.productAttributes
          .filter((x) => x.featured)
          .map((attribute, index) => (
            <li key={index}>{`${attribute.name}: ${attribute.values
              .map((x) => x.name)
              .join(", ")}`}</li>
          ))}
      </ul>
    );
  }

  return (
    <div className={containerClasses}>
      <AsyncAction
        action={() => quickviewOpen(product.productSlug)}
        render={({ run, loading }) => (
          <button
            type="button"
            onClick={run}
            className={classNames("product-card__quickview", {
              "product-card__quickview--preload": loading,
            })}
          >
            <Quickview16Svg />
          </button>
        )}
      />
      {badges}
      {image}
      <div className="product-card__info">
        <div className="product-card__name">
          <Link to={url.product(product)}>{product.productName}</Link>
        </div>
        <div className="product-card__rating">
          <Rating value={product.productRating} />
          <div className=" product-card__rating-legend">{`${product.productTotalReviews} Reviews`}</div>
        </div>
        {features}
      </div>
      <div className="product-card__actions">
        <div className="product-card__availability">
          Availability:
          <span className="text-success">In Stock</span>
        </div>
        {price}
        <div className="product-card__buttons">
          <AsyncAction
            action={() => cartAddItem(product)}
            render={({ run, loading }) => (
              <React.Fragment>
                <button
                  type="button"
                  onClick={run}
                  className={classNames(
                    "btn btn-warning product-card__addtocart",
                    {
                      "btn-loading": loading,
                    }
                  )}
                >
                  Add To Cart
                </button>
                <button
                  type="button"
                  onClick={run}
                  className={classNames(
                    "btn btn-warning product-card__addtocart product-card__addtocart--list",
                    {
                      "btn-loading": loading,
                    }
                  )}
                >
                  Add To Cart
                </button>
              </React.Fragment>
            )}
          />
          <AsyncAction
            action={() => wishlistAddItem(product)}
            render={({ run, loading }) => (
              <button
                type="button"
                onClick={run}
                className={classNames(
                  "btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__wishlist",
                  {
                    "btn-loading": loading,
                  }
                )}
              >
                <Wishlist16Svg />
              </button>
            )}
          />
          <AsyncAction
            action={() => compareAddItem(product)}
            render={({ run, loading }) => (
              <button
                type="button"
                onClick={run}
                className={classNames(
                  "btn btn-light btn-svg-icon btn-svg-icon--fake-svg product-card__compare",
                  {
                    "btn-loading": loading,
                  }
                )}
              >
                <Compare16Svg />
              </button>
            )}
          />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  /**
   * product object
   */
  product: PropTypes.object.isRequired,
  /**
   * product card layout
   * one of ['grid-sm', 'grid-nl', 'grid-lg', 'list', 'horizontal']
   */
  layout: PropTypes.oneOf([
    "grid-sm",
    "grid-nl",
    "grid-lg",
    "list",
    "horizontal",
  ]),
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  cartAddItem,
  wishlistAddItem,
  compareAddItem,
  quickviewOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
