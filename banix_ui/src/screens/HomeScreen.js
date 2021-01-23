import axios from "axios";
import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/store/ProductCard";
import { PRODUCT_LIST_URL } from "../config";
import { Product } from "../services/products";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get(PRODUCT_LIST_URL);
      setProducts(data.products ? data.products : []);
    };
    fetchProducts();
  }, []);
  console.log("Products recieved from backend is ", products);
  return (
    <>
      <Row>
        {products.map((rawProduct) => {
          const product = new Product(rawProduct);
          return (
            <Col sm={12} md={6} lg={4} xl={3}>
              <ProductCard key={product.productId} product={product} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default HomeScreen;
