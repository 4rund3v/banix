// react
import React from "react";
// third-party
import { Link } from "react-router-dom";
// application
import Currency from "../shared/Currency";
import { url } from "../../services/utils";

const WidgetProducts = ({ title, products }) => {
  const productsList = products.map((product) => {
    let image;
    let price;

    if (product.productPrimaryImage) {
      image = (
        <div className="widget-products__image">
          <div className="product-image">
            <Link to={url.product(product)} className="product-image__body">
              <img
                className="product-image__img"
                src={`/media/images/cart/${product.productPrimaryImage}`}
                alt={product.productSlug}
              />
            </Link>
          </div>
        </div>
      );
    }

    if (product.productSellingPrice) {
      price = (
        <React.Fragment>
          <span className="widget-products__new-price">
            <Currency value={product.productSellingPrice} />
          </span>{" "}
          <span className="widget-products__old-price">
            <Currency value={product.productCostPrice} />
          </span>
        </React.Fragment>
      );
    } else {
      price = <Currency value={product.productCostPrice} />;
    }

    return (
      <div key={product.id} className="widget-products__item">
        {image}
        <div className="widget-products__info">
          <div className="widget-products__name">
            <Link to={url.product(product)}>{product.productName}</Link>
          </div>
          <div className="widget-products__prices">{price}</div>
        </div>
      </div>
    );
  });

  return (
    <div className="widget-products widget">
      <h4 className="widget__title">{title}</h4>
      <div className="widget-products__list">{productsList}</div>
    </div>
  );
};

export default WidgetProducts;
