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
        <Card className="product-card product-card--layout--grid product-card--size--sm ">
          <div className="product-card__image product-image">
            <Link to={`/product/${product.productId}`} className="productLink">
              <Card.Img
                className="product-image__img"
                src={`/media/images/card/${product.productPrimaryImage}`}
                variant="top"
              ></Card.Img>
            </Link>
          </div>

          <Card.Body>
            <Link to={`/product/${product.productId}`} className="productLink">
              <Card.Title as="div">
                <h4>
                  {product.productName.length > 40
                    ? product.productName.substring(0, 38)
                    : product.productName}
                </h4>
              </Card.Title>
            </Link>
            <Card.Text className="product-card__rating" as="div">
              <Rating
                key={product.productId}
                ratingValue={product.productRating}
                ratingText={`${product.productTotalReviews} reviews`}
              />
            </Card.Text>
            <Card.Text className="product-card__prices">
              {" Price : "}
              <ProductPrice product={product} onlyPrice={true} />
            </Card.Text>
          </Card.Body>
        </Card>
      );
    }
    return productCard;
  }
}

export default ProductCard;
