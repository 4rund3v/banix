import React, { useEffect } from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../misc/Message";
import Loader from "../misc/Loader";
import { getProductDetails } from "../../actions/productActions";

const OrderItemRow = ({ orderItem }) => {
  console.log("[OrderItemRow] The order item is :: ", orderItem);
  const dispatch = useDispatch();
  const productInfo = useSelector((state) => state.productDetails);
  const { loading, product, error } = productInfo;
  useEffect(() => {
    dispatch(getProductDetails(orderItem.orderProductId));
  }, [dispatch]);

  console.log("[OrderItemRow] The order item -> product is ::: ", product);
  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Row className="orderitem__row">
        <Col className="orderitem__col" md={2}>
          <Image
            src={`/media/images/cart/${product.productPrimaryImage}`}
            alt={product.productName}
            fluid
            rounded
          />
        </Col>
        <Col className="orderitem__col">
          <Link to={`/product/${product.productId}`}>
            <strong>{product.productName}</strong>
          </Link>
        </Col>
        <Col md={4} className="orderitem__col">
          {orderItem.orderItemQty} x &#8377; {orderItem.totalSellingPrice} =
          <strong>
            {" "}
            &#8377; {orderItem.orderItemQty * orderItem.totalSellingPrice}
          </strong>
        </Col>
      </Row>
    </>
  );
};

export default OrderItemRow;
