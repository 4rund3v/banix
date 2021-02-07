import React from "react";

const ProductDescriptionTab = ({ product }) => {
  return (
    <div className="py-3">
      <p>About this item</p>
      <ul>
        <li>Vithamas app based Smart Control</li>
        <li>
          Multi color adjustment voice controlled strip light scenes and music
        </li>
        <li>Mode features Wireless mesh network</li>
      </ul>
      <p> Product Description : </p>
      {product.productDescription}
    </div>
  );
};

export default ProductDescriptionTab;
