import React from "react";
import { Row, Col, Table } from "react-bootstrap";

const ProductSpecificationTab = () => {
  return (
    <Row className="justify-content-md-center">
      <Col md={8}>
        <h2 className="py-3">Technical Specifications</h2>
        <Table striped bordered>
          <tbody>
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
            <tr>
              <td>Height</td>
              <td>0.2 Inches</td>
            </tr>
            <tr>
              <td>Length</td>
              <td>78.74 Inches</td>
            </tr>
            <tr>
              <td>Width</td>
              <td>0.57 Inches</td>
            </tr>
            <tr>
              <td>Weight</td>
              <td>40 Grams</td>
            </tr>
            <tr>
              <td>Style</td>
              <td>Hue Lightstrip Base 2 mts</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Multi-Colored</td>
            </tr>
            <tr>
              <td>Material</td>
              <td>Polycarbonate and Synthetic</td>
            </tr>
            <tr>
              <td>Included Components</td>
              <td>
                1 Vitamas Led 2-meter Lightstrip, 1AC Adapter, 1PowerCable
              </td>
            </tr>
            <tr>
              <td>Batteries Included</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Batteries Required</td>
              <td>No</td>
            </tr>
            <tr>
              <td>Wattage</td>
              <td>120.00</td>
            </tr>
            <tr>
              <td>Manufacturer</td>
              <td>Banix</td>
            </tr>
            <tr>
              <td>Color</td>
              <td>Multi-Colored</td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};

export default ProductSpecificationTab;
