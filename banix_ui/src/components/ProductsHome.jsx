import React, { Component, ReactFragment } from "react";
import { Container, Col, Row } from "react-bootstrap";

class ProductsHome extends Component {
  state = {};
  render() {
    return (
      <Row>
        <Col sm={8}>sm=8</Col>
        <Col sm={4}>sm=4</Col>
      </Row>
    );
  }
}

export default ProductsHome;
