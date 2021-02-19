import React from "react";

const ProductPrice = ({ product, onlyPrice }) => {
  console.log("ProductPrice : the product recieved is :: ", onlyPrice);
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
      {onlyPrice ? (
        <span className="product_price_main_default">
          &#8377;
          {product.productSellingPrice <= product.productCostPrice
            ? product.productSellingPrice
            : product.productCostPrice}
        </span>
      ) : product.productSellingPrice < product.productCostPrice ? (
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
          {product.productSellingPrice <= product.productCostPrice
            ? product.productSellingPrice
            : product.productCostPrice}
        </span>
      )}
    </span>
  );
};

export default ProductPrice;
