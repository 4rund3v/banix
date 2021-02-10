import React from "react";

const ProductPrice = ({ product }) => {
  return (
    <>
      {product.productSellingPrice < product.productCostPrice ? (
        <span>
          <span className="text-secondary">Price:</span>{" "}
          <span className="text-danger">
            &#8377;
            {product.productSellingPrice}
          </span>{" "}
          <del className="text-muted">
            &#8377;
            {product.productCostPrice}
          </del>
        </span>
      ) : (
        <span>
          &#8377;
          {product.productCostPrice}
        </span>
      )}
    </>
  );
};

export default ProductPrice;
