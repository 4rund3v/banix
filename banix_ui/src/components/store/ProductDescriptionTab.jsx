import React from "react";

const ProductDescriptionTab = ({ product }) => {
  return (
    <div className="typography">
      <h3>About this item</h3>
      <p>

      
      <ul>
        <li>Vithamas app based Smart Control</li>
        <li>
          Multi color adjustment voice controlled strip light scenes and music
        </li>
        <li>Mode features Wireless mesh network</li>
      </ul>
      </p>
      <h3> Product Description : </h3>
      <p>{product.productDescription}</p>
    </div>
  );
};

export default ProductDescriptionTab;
