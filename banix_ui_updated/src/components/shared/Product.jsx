// react
import React, { useState } from "react";

// third-party
import classNames from "classnames";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
// import { cartAddItem } from "../../store/cart";
// import { compareAddItem } from "../../store/compare";
// import { wishlistAddItem } from "../../store/wishlist";

import { Wishlist16Svg, Compare16Svg } from "../../svg";
import AlternativePurchases from "../product/AlternativePurchases";

const cartAddItem = () => {
  console.log("[Product][cartAddItem] Invoked to add item to the cart");
};

const wishlistAddItem = () => {
  console.log("[Product][wishlistAddItem] Invoked to add item to the cart");
};

const Product = () => {
  const {
    product,
    layout,
    wishlistAddItem,
    compareAddItem,
    cartAddItem,
  } = this.props;
  const [quantity, setQuantity] = useState(1);
  let prices;

  if (product.compareAtPrice) {
    prices = (
      <React.Fragment>
        <span className="product__new-price">
          <Currency value={product.price} />
        </span>{" "}
        <span className="product__old-price">
          <Currency value={product.compareAtPrice} />
        </span>
      </React.Fragment>
    );
  } else {
    prices = <Currency value={product.price} />;
  }

  return (
    <div className={`product product--layout--${layout}`}>
      <div className="product__content">
        <ProductGallery layout={layout} images={product.images} />
        <div className="product__info">
          <div className="product__wishlist-compare">
            <AsyncAction
              action={() => wishlistAddItem(product)}
              render={({ run, loading }) => (
                <button
                  type="button"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Wishlist"
                  onClick={run}
                  className={classNames("btn btn-sm btn-light btn-svg-icon", {
                    "btn-loading": loading,
                  })}
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
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Compare"
                  onClick={run}
                  className={classNames("btn btn-sm btn-light btn-svg-icon", {
                    "btn-loading": loading,
                  })}
                >
                  <Compare16Svg />
                </button>
              )}
            />
          </div>
          <h1 className="product__name">{product.name}</h1>
          <div className="product__rating">
            <div className="product__rating-stars">
              <Rating value={product.rating} />
            </div>
            <div className="product__rating-legend">
              <Link to="/">{`${product.reviews} Reviews`}</Link>
              <span>/</span>
              <Link to="/">Write a Review</Link>
            </div>
          </div>
        </div>
        <div className="product__sidebar">
          <div className="product__availability">
            Availabilty: <span className="text-success">In Stock</span>
          </div>

          <div className="product__prices">{prices}</div>
          <div className="product__prices-shipping">
            + Additional Shipping Charges{" "}
          </div>
          <form className="product__options">
            <div className="form-group product__option">
              <div className="product__actions">
                <div className="product__actions-item ">
                  <label
                    htmlFor="product-shipping-code"
                    className="product__option-label"
                  >
                    Check Shipping Availability
                  </label>
                  <div className="input-group">
                    <input
                      type="text"
                      name="pincode"
                      pattern="[0-9]{6}"
                      className="form-control"
                      id="product-shipping-code"
                      placeholder="Enter Pin Code"
                    />
                    <div class="input-group-append">
                      <button
                        className="product__shipping-icon"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("Check the delivery rates questioned.");
                        }}
                      >
                        <span class="input-group-text">
                          <FontAwesomeIcon icon="truck" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-group product__option">
              <label
                htmlFor="product-quantity"
                className="product__option-label"
              >
                Quantity
              </label>
              <div className="product__actions">
                <div className="product__actions-item">
                  <InputNumber
                    id="product-quantity"
                    aria-label="Quantity"
                    className="product__quantity"
                    size="lg"
                    min={1}
                    value={quantity}
                    onChange={() => setQuantity(quantity)}
                  />
                </div>
              </div>
            </div>
            <div className="form-group product__option">
              <div className="product__option-label">Length</div>
              <div className="input-radio-label">
                <div className="input-radio-label__list">
                  <label>
                    <input type="radio" name="length" />
                    <span>5m</span>
                  </label>
                  <label>
                    <input type="radio" name="length" />
                    <span>10m</span>
                  </label>
                  <label>
                    <input type="radio" name="length" />
                    <span>15m</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group product__option">
              <div className="product__actions">
                <div className="product__actions-item product__actions-item--addtocart">
                  <AsyncAction
                    action={() => cartAddItem(product, [], quantity)}
                    render={({ run, loading }) => (
                      <button
                        type="button"
                        onClick={run}
                        disabled={!quantity}
                        className={classNames("btn btn-warning btn-lg", {
                          "btn-loading": loading,
                        })}
                      >
                        Add To Cart
                      </button>
                    )}
                  />
                </div>

                <div className="product__actions-item product__actions-item--buynow">
                  <AsyncAction
                    action={() => cartAddItem(product, [], quantity)}
                    render={({ run, loading }) => (
                      <button
                        type="button"
                        onClick={run}
                        disabled={!quantity}
                        className={classNames("btn btn-success btn-lg", {
                          "btn-loading": loading,
                        })}
                      >
                        {"Buy Now "}
                      </button>
                    )}
                  />
                </div>

                <div className="product__actions-item product__actions-item--wishlist">
                  <AsyncAction
                    action={() => wishlistAddItem(product)}
                    render={({ run, loading }) => (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title="Wishlist"
                        onClick={run}
                        className={classNames(
                          "btn btn-secondary btn-svg-icon btn-lg",
                          {
                            "btn-loading": loading,
                          }
                        )}
                      >
                        <Wishlist16Svg />
                      </button>
                    )}
                  />
                </div>
                <div className="product__actions-item product__actions-item--compare">
                  <AsyncAction
                    action={() => compareAddItem(product)}
                    render={({ run, loading }) => (
                      <button
                        type="button"
                        data-toggle="tooltip"
                        title="Compare"
                        onClick={run}
                        className={classNames(
                          "btn btn-secondary btn-svg-icon btn-lg",
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
          </form>
        </div>
        <AlternativePurchases alternatePurchases={product.alternatePurchases} />
        <div className="product__footer">
          <div className="product__tags tags">
            <div className="tags__list">
              <Link to="/">Smart LED</Link>
              <Link to="/">Multi Color</Link>
              <Link to="/">App Controlled</Link>
            </div>
          </div>

          <div className="product__share-links share-links">
            <ul className="share-links__list">
              <li className="share-links__item share-links__item--type--like">
                <Link to="/">Like</Link>
              </li>
              <li className="share-links__item share-links__item--type--tweet">
                <Link to="/">Tweet</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
