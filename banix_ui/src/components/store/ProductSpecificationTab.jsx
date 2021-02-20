import React from "react";

const ProductSpecificationTab = () => {
  return (
    <div className="spec">
      <h3 className="spec__header">Product Specifications</h3>
      <div className="spec__section">
        {/* 
            Height	0.2 Inches
            Length	78.74 Inches
            Width	0.57 Inches
            Weight	40 Grams
            Style	Hue Lightstrip Base 2 mts
            Colour	White and Color Ambiance
            Material	Polycarbonate and Synthetic
            Included Components	1 Hue Gen 2.0 White Ambiance, Colour Ambiance 2-meter Lightstrip
            Batteries Included	No
            Batteries Required	No
            Wattage	120.00
            Manufacturer	Banix
            */}
                  <h4 className="spec__section-title">{"General"}</h4>

      <div className="spec__row">
          <div className="spec__name">Height</div>
          <div className="spec__value">0.2 Inches</div>
      </div>
      <div className="spec__row">
            <div className="spec__name">Length</div>
            <div className="spec__value">78.74 Inches</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Width</div>
            <div className="spec__value">0.57 Inches</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Weight</div>
            <div className="spec__value">40 Grams</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Style</div>
            <div className="spec__value">Hue Lightstrip Base 2 mts</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Color</div>
            <div className="spec__value">Multi-Colored</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Material</div>
            <div className="spec__value">Polycarbonate and Synthetic</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Included Components</div>
            <div className="spec__value">1 Vitamas Led 2-meter Lightstrip, 1AC Adapter, 1PowerCable</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Batteries Included</div>
            <div className="spec__value">No</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Batteries Required</div>
            <div className="spec__value">No</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Wattage</div>
            <div className="spec__value">120.00</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Manufacturer</div>
            <div className="spec__value">Banix</div>
          </div>
          <div className="spec__row">
            <div className="spec__name">Color</div>
            <div className="spec__value">Multi-Colored</div>
          </div>
      </div>
    </div>
  );
};

export default ProductSpecificationTab;
