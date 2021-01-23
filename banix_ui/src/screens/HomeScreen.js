import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../services/products";
import ProductCard from "../components/store/ProductCard";

function HomeScreen() {
  return (
    <>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <ProductCard key={product._id} product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default HomeScreen;
