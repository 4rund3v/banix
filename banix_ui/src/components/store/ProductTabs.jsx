import React, { useState } from "react";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductReviewTab from "./ProductReviewTab";
import ProductSpecificationTab from "./ProductSpecificationTab";
import { Tabs, Tab } from "react-bootstrap";

const ProductTabs = ({ product }) => {
  const [tabKey, setTabKey] = useState("description");
  const productReviews = [];
  const { productSpecification, productName } = product;
  return (
    <div className="product-tabs">
      <Tabs
        activeKey={tabKey}
        variant={"pills"}
        onSelect={(key) => setTabKey(key)}
      >
        <Tab
          className="product-tabs__item"
          eventKey="description"
          title="Description"
        >
          <div className="product-tabs__content">
            <ProductDescriptionTab
              productName={productName}
              productFeatures={productSpecification.productFeatures}
              productDescription={productSpecification.productDescription}
              productBoxContents={productSpecification.productBoxContents}
            />
          </div>
        </Tab>
        <Tab
          className="product-tabs__item"
          eventKey="speification"
          title="Specification"
        >
          <div className="product-tabs__content">
            <ProductSpecificationTab
              productDimensions={productSpecification.productDimensions}
              productBoxDimensions={productSpecification.productBoxDimensions}
            />
          </div>
        </Tab>
        <Tab className="product-tabs__item" eventKey="reviews" title="Reviews">
          <div className="product-tabs__content">
            <ProductReviewTab productReviews={productReviews} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
