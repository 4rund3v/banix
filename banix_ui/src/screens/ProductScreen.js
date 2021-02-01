import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/store/Rating";
import { getProductDetails } from "../actions/productActions";
import { IMAGE_URL } from "../config";
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import { Product } from "../schema/products";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product: rawProduct } = productDetails;

  const product = new Product(rawProduct);
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  console.log("product info recieved is ::", product);
  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        {"Go Back"}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger"> {error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image
              src={`/images/details${product.productImage}`}
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
                {product.productStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col> Qty :</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.productStock).keys()]
                            .slice(0, 10)
                            .map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCartHandler}
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
      )}
    </>
  );
};

export default ProductScreen;
