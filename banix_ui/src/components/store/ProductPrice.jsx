import React from "react";

const ProductPrice = ({ product }) => {
  const discountPercentage = Number(
    (Number(product.productCostPrice) - Number(product.productSellingPrice)) /
      100
  );
  return (
    <>
      {product.productSellingPrice < product.productCostPrice ? (
        <span>
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
            &#x00025;{discountPercentage} {"off"}
          </span>{" "}
        </span>
      ) : (
        <span className="product_price_main_default">
          &#8377;
          {product.productCostPrice}
        </span>
      )}
    </>
  );
};

export default ProductPrice;
