import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
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
          <Link to={`${PRODUCT_URL}/${product._id}`} className="productLink">
            <Card.Img
              src={`${IMAGE_URL}${product.image}`}
              variant="top"
            ></Card.Img>
          </Link>
          <Card.Body>
            <Link to={`${PRODUCT_URL}/${product._id}`} className="productLink">
              <Card.Title as="div">
                <h4>{product.name}</h4>
              </Card.Title>
            </Link>
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
