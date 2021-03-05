import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/misc/Message";
import Loader from "../components/misc/Loader";
import { getOrderDetails } from "../actions/orderActions";

const OrderScreen = ({ match }) => {
  const orderId = match.params.id;
  console.log("[OrderScreen] The order id is :: ", orderId);
  const dispatch = useDispatch();
  const orderInfo = useSelector((state) => state.orderDetails);
  const { loading, order, error } = orderInfo;
  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h2>Order Details</h2>
      <Row></Row>
    </>
  );
};

export default OrderScreen;
