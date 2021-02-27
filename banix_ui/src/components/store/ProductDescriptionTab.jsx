import React from "react";

const ProductDescriptionTab = ({
  productName,
  productFeatures,
  productDescription,
  productBoxContents,
}) => {
  return (
    <div className="typography">
      <span>{productName}</span>
      <h3>About this Item</h3>
      <ul>
        {productFeatures &&
          productFeatures.map((productFeature, idx) => (
            <li key={idx}>{productFeature}</li>
          ))}
      </ul>
      <h3>Product Description</h3>
      <p>{productDescription}</p>

      <div className="box-content__section">
        <h3>Box Contents</h3>
        <ul>
          {productBoxContents &&
            productBoxContents.map((boxItem, idx) => (
              <li key={idx} className="box-content__row">
                {boxItem}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductDescriptionTab;
