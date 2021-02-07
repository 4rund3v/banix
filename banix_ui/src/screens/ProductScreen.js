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
  InputGroup,
  FormGroup,
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Rating from "../components/store/Rating";
import { getProductDetails } from "../actions/productActions";
import { IMAGE_URL } from "../config";
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import { Product } from "../schema/products";
import ProductDescriptionTab from "../components/store/ProductDescriptionTab";
import ProductSpecificationTab from "../components/store/ProductSpecificationTab";
import ProductReviewTab from "../components/store/ProductReviewTab";

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
  const buyNowHander = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const pinCode = null;

  const colorVariants = ["red", "blue", "white-green"];
  const lengthVariants = ["5 meter", "10 meter", "15 meter", "20 meter"];
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
        <div classname="product__page">
          <Container>
            <Row>
              <Col md={6}>
                <Image
                  src={`/images/details${product.productImage}`}
                  alt={product.productName}
                  fluid
                ></Image>
              </Col>
              {/* <Col md={3}>
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
                Check Delivery
                <Row>
                  <InputGroup>
                    <Form.Control type="input" placeholder="Enter PinCode" />
                    <InputGroup.Append>
                      <Button type="submit" variant="outline-primary">
                        Check{" "}
                        <FontAwesomeIcon
                          icon="map-marker-alt"
                          aria-hidden="true"
                        />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Row>
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
          </Col>*/}
              <Col>
                <span className="product__name">{product.productName}</span>
                <div className="product__rating">
                  <div className="product__rating-stars">
                    <Rating
                      ratingValue={product.productRating}
                      ratingText={`${product.productTotalReviews} Reviews`}
                    />
                  </div>
                </div>
                <div className="product__description">
                  {product.productDescription &&
                    product.productDescription.substring(0, 200)}
                  <Link to="#">{"... more"}</Link>
                </div>
                <ul className="product__meta text-muted">
                  <li className="product__meta-availability px-2">
                    {"Availability : "}
                    {product.productStock > 0 ? (
                      <span className="text-success">In Stock</span>
                    ) : (
                      <span className="text-danger">Out Of Stock</span>
                    )}
                  </li>
                  <li className="product__meta-brand px-2">
                    Brand:
                    <Link to="/">Banix</Link>
                  </li>
                  <li className="product__meta-brand px-2">SKU: 83690/32</li>
                </ul>
                <div className="product__info">
                  <div className="product__price">{product.productPrice}</div>
                  <h3>Color</h3>
                  <Form className="product__options">
                    <FormGroup>
                      {colorVariants &&
                        colorVariants.map((color, index) => (
                          <Form.Label
                            className="input-radio-color__item input-radio-color__item--white"
                            data-toggle="tooltip"
                            title={color}
                          >
                            <input type="radio" name="color" />
                            <span>{color}</span>
                          </Form.Label>
                        ))}
                    </FormGroup>
                  </Form>
                  <h3>Size</h3>
                  <Form className="product__options">
                    <FormGroup>
                      {lengthVariants &&
                        lengthVariants.map((length, index) => (
                          <Form.Label
                            className="input-radio-color__item input-radio-color__item--white"
                            data-toggle="tooltip"
                            title={length}
                          >
                            <input type="radio" name="length" />
                            <span>{length}</span>
                          </Form.Label>
                        ))}
                    </FormGroup>
                  </Form>
                </div>
                <div></div>
                <div className="product__info__purchase_options">
                  <Button
                    onClick={addToCartHandler}
                    className="btn-block"
                    type="button"
                    variant="warning"
                    disabled={product.productStock === 0}
                  >
                    {"Add To Cart"}
                  </Button>
                  <Button
                    onClick={buyNowHander}
                    className="btn-block "
                    type="button"
                    variant="success"
                    disabled={product.productStock === 0}
                  >
                    {"Buy Now"}
                  </Button>
                </div>
              </Col>
            </Row>
            {/* <Row>
            <ProductTabs></ProductTabs>
          </Row>
          <Row>
          <BlockProductsCarousel title="Related Products" layout="grid-4-sm" products={products} withSidebar />
          </Row> */}
            <Row className="justify-content-md-center">
              <Col>
                <Tabs defaultActiveKey="description">
                  <Tab eventKey="description" title="Description">
                    <ProductDescriptionTab product={product} />
                  </Tab>
                  <Tab eventKey="speification" title="Specification">
                    <ProductSpecificationTab product={product} />
                  </Tab>
                  <Tab eventKey="reviews" title="Reviews">
                    <ProductReviewTab product={product} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
