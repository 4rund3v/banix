import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  InputGroup,
  Container,
  Carousel,
  CarouselItem,
  FormControl,
  Form,
} from "react-bootstrap";
import Rating from "../components/store/Rating";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import { Product } from "../schema/products";
import ProductTabs from "../components/store/ProductTabs";
import ProductPrice from "../components/store/ProductPrice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ImageGallery from "react-image-gallery";
import ProductGallery from "../components/store/ProductGallery";

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
    history.push("/login?redirect=shipping");
  };
  const [pinCode, setPinCode] = useState("");

  const [deliveryInfo, setDeliveryInfo] = useState({});

  const productSpeicifications = {};

  const checkDeliveryHandler = () => {
    console.log("[ProductScreen] Check delivery invoked !!", pinCode);
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_URL}${url}`)
    //   .then(({ data }) => {
    //     console.log("data recivied from backend is ::: ", data);
    //     if (data) {
    //       setDeliveryInfo({
    //         deliveryDays: data.estimated_delivery_days,
    //         rate: data.rate,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Unable to fetch the delivery information", error);
    //   });
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
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="product__page">
          <Row>
            <Col md={8} fluid>
              <ProductGallery productMedia={product.productCarouselMedia} />
            </Col>

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

              <ul className="product__meta text-muted">
                <li className="product__meta-availability px-2">
                  {"Availability : "}
                  {product.productStock > 0 ? (
                    <span className="text-success">In Stock</span>
                  ) : (
                    <span className="text-danger">Out Of Stock</span>
                  )}
                </li>
              </ul>
              <div className="product__info">
                <div className="product__prices">
                  <ProductPrice product={product} />
                </div>
                {/* <Form className="product__variants">
                    <h3>Color</h3>
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
                  </Form> */}
                <div className="product__actions-item">
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      {"   "}
                      Quantity
                    </InputGroup.Text>
                    <FormControl
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
                    </FormControl>
                  </InputGroup>
                </div>
                <div className="product__actions-item">
                  <InputGroup>
                    <FormControl
                      id="zip"
                      type="text"
                      pattern="[0-9]{6}"
                      placeholder="Delivery PinCode"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                    <InputGroup.Append>
                      <Button
                        className="btn btn-secondary"
                        onClick={checkDeliveryHandler}
                      >
                        Check!
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                  {deliveryInfo &&
                    deliveryInfo.deliveryDays &&
                    (deliveryInfo.deliveryDays === -1 ? (
                      <div className="product__delivery_info">
                        <span className="text-danger">
                          Cannot deliver to location
                        </span>{" "}
                      </div>
                    ) : (
                      <div className="product__delivery_info">
                        <span className="text-dark">
                          Delivery in {deliveryInfo.deliveryDays} Days
                        </span>{" "}
                        |<span>+ &#8377; {deliveryInfo.rate}</span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="product__info__purchase_options py-2">
                <Button
                  onClick={addToCartHandler}
                  className="btn-block py-2"
                  type="button"
                  variant="warning"
                  disabled={product.productStock === 0}
                >
                  {"Add To Cart"}
                </Button>
                <Button
                  onClick={buyNowHander}
                  className="btn-block"
                  type="button"
                  variant="success"
                  disabled={product.productStock === 0}
                >
                  {"Buy Now"}
                </Button>
              </div>
              <div>
                <span className="text-muted">{"You can also buy from "}</span>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://www.amazon.in/Vithamas-Smart-Multicolor-Powered-Banix/dp/B08TMCRLSW"
                  }
                >
                  <Button className="btn btn-info" onClick={() => {}}>
                    {"  "}
                    <FontAwesomeIcon icon={["fab", "amazon"]} />
                  </Button>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    "https://www.flipkart.com/vithamas-app-controlled-rgb-light-strip/p/itm5a0fb24e774a2"
                  }
                >
                  <Button className="btn btn-info ml-2" onClick={() => {}}>
                    {"  "}
                    <FontAwesomeIcon icon={["fab", "facebook"]} />
                  </Button>
                </a>
              </div>
            </Col>
          </Row>

          {/* <Row>
            <ProductTabs></ProductTabs>
          </Row>
          <Row>
          <BlockProductsCarousel title="Related Products" layout="grid-4-sm" products={products} withSidebar />
          </Row> */}
          <Row>
            <ProductTabs product={product} />
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductScreen;
