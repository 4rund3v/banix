import React from "react";

const ProductPrice = ({ product }) => {
  const discountPercentage = Math.round(
    Number(
      ((Number(product.productCostPrice) -
        Number(product.productSellingPrice)) /
        Number(product.productCostPrice)) *
        100
    )
  );
  return (
    <span className="product__price">
      {product.productSellingPrice < product.productCostPrice ? (
        <>
          <span className="text-secondary">Price:</span>{" "}
          <span className="product_price_main">
            &#8377;
            {product.productSellingPrice}
          </span>{" "}
          <del className="product_price_muted">
            &#8377;
            {product.productCostPrice}
          </del>
          <span className="product_price_discount">
            {" "}
            {discountPercentage}&#x00025;{"off"}
          </span>{" "}
        </>
      ) : (
        <span className="product_price_main_default">
          &#8377;
          {product.productCostPrice}
        </span>
      )}
    </span>
  );
};

export default ProductPrice;
