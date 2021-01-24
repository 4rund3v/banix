import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/store/ProductCard";
import { Product } from "../schema/products";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  console.log("Products recieved from backend is ", products);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((rawProduct) => {
            const product = new Product(rawProduct);
            return (
              <Col key={product.productId} sm={12} md={6} lg={4} xl={3}>
                <ProductCard key={product.productId} product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;