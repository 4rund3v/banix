import React, { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import Loader from "../misc/Loader";
import Message from "../misc/Message";

const OrderItemInfo = ({ buyAgainHandler, orderProductInfo }) => {
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(getProductDetails(orderProductInfo.orderProductId));
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row className="order__listing-row-product-info">
          <ListGroup variant="flush">
            <Row key={product.productId} className="h-100">
              <Col md={2}>
                <Image
                  src={`/media/images/cart/${product.productPrimaryImage}`}
                  alt={product.productName}
                  fluid
                  rounded
                />
              </Col>
              <Col md={4}>
                <Link to={`/product/${product.productId}`}>
                  <strong>{product.productName}</strong>
                </Link>
                <br />
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => buyAgainHandler(product.productId)}
                >
                  Buy Again
                </Button>
              </Col>
              <Col md={2}>
                <p>
                  Qty: {orderProductInfo.orderItemQty}
                  {/* <br />
              Price :<strong> &#8377; {orderProductInfo.totalPrice}</strong> */}
                </p>
              </Col>
              <Col md={4}>
                <ButtonGroup vertical>
                  <Button variant="outline-primary" className="mb-1">
                    Track Package
                  </Button>
                  <Button variant="outline-primary" className="mb-1">
                    Leave Review
                  </Button>
                </ButtonGroup>
              </Col>
            </Row>
          </ListGroup>
        </Row>
      )}
    </>
  );
};

export default OrderItemInfo;
