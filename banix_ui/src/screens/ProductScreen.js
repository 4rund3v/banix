import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/store/Rating";

import { getProductById } from "../services/products";
import { IMAGE_URL } from "../config";

const ProductScreen = ({ match }) => {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    getProductById(match.params.id).then((res) => {
      setProduct(res);
    });
    // setProduct(temp);
  }, [match]);

  console.log("Porduct is::", product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {"Go Back"}
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={`${IMAGE_URL}${product.productImage}`}
            alt={product.productName}
            fluid
          ></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{product.productName}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                ratingValue={product.productRating}
                ratingText={`${product.productTotalReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price: &#8377; {product.productPrice}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {product.productDescription}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col> Price:</Col>
                  <Col>
                    <strong>&#8377; {product.productPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col> Status:</Col>
                  <Col>
                    {product.productStock > 0 ? " In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.productStock === 0}
                >
                  {" Add to cart"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
