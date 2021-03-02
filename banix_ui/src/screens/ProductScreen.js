import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Button,
  InputGroup,
  Container,
  FormControl,
} from "react-bootstrap";
import { ToastContainer } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getProductDetails,
  fetchServiceabilityDetails,
} from "../actions/productActions";
import { addToCart } from "../actions/cartActions";

import { Product } from "../schema/products";
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import ProductTabs from "../components/store/ProductTabs";
import ProductPrice from "../components/store/ProductPrice";
import ProductGallery from "../components/store/ProductGallery";
import Rating from "../components/store/Rating";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  useEffect(() => {
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match]);
  const customerLogin = useSelector((state) => state.customerLogin);
  const {
    loading: loadingCustomer,
    error: errorCustomer,
    customerInfo,
  } = customerLogin;
  console.log("[ProductScreen] The customer info is : ", customerInfo);

  const cartInfo = useSelector((state) => state.cart);
  const {
    loading: loadingshippingAddress,
    error: errorShippingAddress,
    shippingAddress,
  } = cartInfo;
  console.log("[ProductScreen] the shipping address is : ", shippingAddress);

  const addToCartHandler = () => {
    dispatch(addToCart(product.productId, qty));
    // history.push(`/cart/${match.params.id}?qty=${qty}`);
  };

  const buyNowHander = () => {
    dispatch(addToCart(product.productId, qty));
    history.push("/login?redirect=shipping");
  };
  const [pinCode, setPinCode] = useState(shippingAddress.pinCode || "");

  const shippingCost = useSelector((state) => state.shippingCost);
  const { shippingLoading, shippingError, serviceability } = shippingCost;
  const [deliveryInfo, setDeliveryInfo] = useState({});
  useEffect(() => {
    setDeliveryInfo(serviceability);
  }, [serviceability]);
  const checkDeliveryHandler = () => {
    dispatch(fetchServiceabilityDetails(product.productId, pinCode));
  };

  useEffect(() => {
    if (pinCode) {
      console.log("Checking delivery options :: ", pinCode);
      checkDeliveryHandler();
    }
  }, []);
  console.log("[The product Screen]       ]:: ", product);
  return (
    <>
      <ToastContainer autoClose={2000} hideProgressBar />
      <Link className="btn btn-light my-3" to="/">
        {"Go Back"}
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        product.productId && (
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
                    <ProductPrice
                      product={product}
                      deliveryRate={
                        deliveryInfo ? deliveryInfo.deliveryRate : null
                      }
                    />
                  </div>

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

                    {shippingLoading ? (
                      <> </>
                    ) : shippingError ? (
                      <Message variant="danger">{shippingError}</Message>
                    ) : (
                      deliveryInfo &&
                      deliveryInfo.courierCompanyId &&
                      (deliveryInfo.estimatedDeliveryDays === -1 ? (
                        <div className="product__delivery_info">
                          <span className="text-danger">
                            Cannot deliver to location
                            {` ${
                              deliveryInfo.deliveryPinCode
                                ? deliveryInfo.deliveryPinCode
                                : pinCode
                            }`}
                          </span>{" "}
                        </div>
                      ) : (
                        <div className="product__delivery_info">
                          <span className="text-dark">
                            Delivery in {deliveryInfo.estimatedDeliveryDays}{" "}
                            Days
                          </span>{" "}
                        </div>
                      ))
                    )}
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

            {
              <Row>
                <ProductTabs product={product} />
              </Row>
            }
          </Container>
        )
      )}
    </>
  );
};

export default ProductScreen;
