import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { IMAGE_URL } from "../config";
import Rating from "./Rating";
const PRODUCT_URL = "/product";

class Product extends Component {
  state = {
    product: null,
  };
  componentDidMount() {
    this.setState({ product: this.props.product });
  }
  render() {
    let productCard = null;
    const { product } = this.state;
    if (this.state.product) {
      productCard = (
        <Card className="my-3 p-3 rounded">
          <a href={`${PRODUCT_URL}/${product._id}`}>
            <Card.Img
              src={`${IMAGE_URL}${product.image}`}
              variant="top"
            ></Card.Img>
          </a>
          <Card.Body>
            <Card.Title as="div">
              <h4>{product.name}</h4>
            </Card.Title>
            <Card.Text as="div">
              <Rating
                key={product._id}
                ratingValue={product.rating}
                ratingText={`${product.numReviews} reviews`}
              />
            </Card.Text>
            <Card.Text as="h3">&#8377; {product.price}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return productCard;
  }
}

export default Product;
