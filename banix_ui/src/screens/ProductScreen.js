import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import Rating from "../components/store/Rating";

import { getProductById } from "../services/products";
import { IMAGE_URL } from "../config";
class ProductScreen extends Component {
  state = {};
  render() {
    const product = getProductById(this.props.match.params.id);
    console.log("Porduct is::", product);
    return (
      <>
        <Link className="btn btn-light my-3" to="/">
          {"Go Back"}
        </Link>
        <Row>
          <Col md={6}>
            <Image
              src={`${IMAGE_URL}${product.image}`}
              alt={product.name}
              fluid
            ></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  ratingValue={product.rating}
                  ratingText={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Price: &#8377; {product.price}</strong>
              </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
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
                      <strong>&#8377; {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col> Status:</Col>
                    <Col>
                      {product.countInStock > 0 ? " In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
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
  }
}

export default ProductScreen;
