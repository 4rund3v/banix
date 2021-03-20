import React, { useEffect } from "react";
// third party
import { Row, Col } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// components
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import ProductCard from "../components/store/ProductCard";
// product actions
import { listProducts } from "../actions/productActions";

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
      <ToastContainer autoClose={1500} hideProgressBar />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col
                className="mt-2"
                key={product.productId}
                sm={12}
                md={6}
                lg={4}
                xl={3}
              >
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
