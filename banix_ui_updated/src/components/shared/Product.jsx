// react
import React, { Component } from "react";

// third-party
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// application
import AsyncAction from "./AsyncAction";
import Currency from "./Currency";
import InputNumber from "./InputNumber";
import ProductGallery from "./ProductGallery";
import Rating from "./Rating";
import { cartAddItem } from "../../store/cart";
import { compareAddItem } from "../../store/compare";
import { Wishlist16Svg, Compare16Svg } from "../../svg";
import { wishlistAddItem } from "../../store/wishlist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 1,
    };
  }

  handleChangeQuantity = (quantity) => {
    this.setState({ quantity });
  };

  render() {
    const {
      product,
      layout,
      wishlistAddItem,
      compareAddItem,
      cartAddItem,
    } = this.props;
    const { quantity } = this.state;
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

            <ul className="product__meta">
              <li className="product__meta-availability">
                Availability: <span className="text-success">In Stock</span>
              </li>
              <li>
                Brand:
                <Link to="/">Banix</Link>
              </li>
              <li>SKU: 83690/32</li>
            </ul>
          </div>
          <div className="product__sidebar">
            <div className="product__availability">
              Availabilty: <span className="text-success">In Stock</span>
            </div>

            <div className="product__prices">{prices}</div>

            <form className="product__options">
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
                      onChange={this.handleChangeQuantity}
                    />
                  </div>
                </div>
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
                </div>
              </div>
            </form>
          </div>
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
          <div className="product__actions-item">
            <span className="text-muted">{"You can also buy from "}</span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW"
              }
            >
              <button className="btn btn-info ml-2 p-2" onClick={() => {}}>
                {"  "}
                <FontAwesomeIcon icon={["fab", "amazon"]} />
              </button>
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://www.flipkart.com/vithamas-app-controlled-rgb-light-strip/p/itm5a0fb24e774a2"
              }
            >
              <button className="btn btn-info ml-2 p-2" onClick={() => {}}>
                {"  "}
                <FontAwesomeIcon icon={["fab", "facebook"]} />
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Product.propTypes = {
  /** product object */
  product: PropTypes.object.isRequired,
  /** one of ['standard', 'sidebar', 'columnar', 'quickview'] (default: 'standard') */
  layout: PropTypes.oneOf(["standard", "sidebar", "columnar", "quickview"]),
};

Product.defaultProps = {
  layout: "standard",
};

const mapDispatchToProps = {
  cartAddItem,
  wishlistAddItem,
  compareAddItem,
};

export default connect(() => ({}), mapDispatchToProps)(Product);
