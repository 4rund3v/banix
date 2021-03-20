import React from "react";

const ProductPrice = ({ product, deliveryRate, onlyPrice }) => {
  console.log("ProductPrice : the product onlyPrice is :: ", onlyPrice);
  console.log("ProductPrice : the product deliveryRate is :: ", deliveryRate);
  const discountPercentage = Math.round(
    Number(
      ((Number(product.productCostPrice) -
        Number(product.productSellingPrice)) /
        Number(product.productCostPrice)) *
        100
    )
  );
  return (
    <React.Fragment>
      <span className="product__price">
        {onlyPrice ? (
          <span className="product_price_main_default">
            &#8377;{" "}
            {product.productSellingPrice <= product.productCostPrice
              ? product.productSellingPrice
              : product.productCostPrice}
          </span>
        ) : product.productSellingPrice < product.productCostPrice ? (
          <>
            <span className="text-secondary">Price:</span>{" "}
            <span className="product_price_main">
              &#8377; {product.productSellingPrice}
            </span>{" "}
            <del className="product_price_muted">
              &#8377;
              {product.productCostPrice}
            </del>
            <span className="product_price_discount">
              {" "}
              {discountPercentage}&#x00025;{" off"}
            </span>
          </>
        ) : (
          <span className="product_price_main_default">
            &#8377;{"  "}
            {product.productSellingPrice <= product.productCostPrice
              ? product.productSellingPrice
              : product.productCostPrice}
          </span>
        )}
      </span>
      <p className="product__delivery_price_info text-secondary">
        <span>
          + Delivery Charges
          {deliveryRate ? (
            <span>
              <strong>&#8377; {deliveryRate}</strong>,
            </span>
          ) : null}
        </span>
      </p>
    </React.Fragment>
  );
};

export default ProductPrice;
