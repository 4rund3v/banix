import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import ProductCard from "../components/store/ProductCard";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { ToastContainer } from "react-toastify";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  console.log("[HomeScreen] Products recieved from backend is ", products);
  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
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
