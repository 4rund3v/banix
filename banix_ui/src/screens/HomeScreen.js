import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../services/products";
import Product from "../components/Product";

function HomeScreen() {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
