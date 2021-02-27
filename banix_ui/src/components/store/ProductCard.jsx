import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import Rating from "./Rating";

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
    if (product) {
      productCard = (
        <Card className="p-1 rounded">
          <Link to={`/product/${product.productId}`} className="productLink">
            <Card.Img
              src={`/media/images/card/${product.productPrimaryImage}`}
              variant="top"
            ></Card.Img>
          </Link>
          <Card.Body>
            <Link to={`/product/${product.productId}`} className="productLink">
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
            <Card.Text>
              Price : <ProductPrice product={product} onlyPrice={true} />
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return productCard;
  }
}

export default ProductCard;
