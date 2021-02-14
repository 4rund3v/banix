import React, { useState } from "react";
import ProductDescriptionTab from "./ProductDescriptionTab";
import ProductReviewTab from "./ProductReviewTab";
import ProductSpecificationTab from "./ProductSpecificationTab";
import { Tabs, Tab } from "react-bootstrap";

const ProductTabs = ({ product }) => {
  const [tabKey, setTabKey] = useState("description");
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
            <ProductDescriptionTab product={product} />
          </div>
        </Tab>
        <Tab
          className="product-tabs__item"
          eventKey="speification"
          title="Specification"
        >
          <div className="product-tabs__content">
            <ProductSpecificationTab product={product} />
          </div>
        </Tab>
        <Tab className="product-tabs__item" eventKey="reviews" title="Reviews">
          <div className="product-tabs__content">
            <ProductReviewTab product={product} />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default ProductTabs;
