import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import { IMAGE_URL } from "../../config";
const PRODUCT_URL = "/product";

class ProductCard extends Component {
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
          <Link
            to={`${PRODUCT_URL}/${product.productId}`}
            className="productLink"
          >
            <Card.Img
              src={`${IMAGE_URL}${product.productImage}`}
              variant="top"
            ></Card.Img>
          </Link>
          <Card.Body>
            <Link
              to={`${PRODUCT_URL}/${product.productId}`}
              className="productLink"
            >
              <Card.Title as="div">
                <h4>{product.productName}</h4>
              </Card.Title>
            </Link>
            <Card.Text as="div">
              <Rating
                key={product.productId}
                ratingValue={product.productRating}
                ratingText={`${product.productTotalReviews} reviews`}
              />
            </Card.Text>
            <Card.Text as="h3">&#8377; {product.productPrice}</Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return productCard;
  }
}

export default ProductCard;
