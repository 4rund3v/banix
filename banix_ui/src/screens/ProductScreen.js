import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  Container,
  Tabs,
  Carousel,
  CarouselItem,
  Tab,
  FormControl,
} from "react-bootstrap";
import Rating from "../components/store/Rating";
import { getProductDetails } from "../actions/productActions";
import Loader from "../components/misc/Loader";
import Message from "../components/misc/Message";
import { Product } from "../schema/products";
import ProductDescriptionTab from "../components/store/ProductDescriptionTab";
import ProductSpecificationTab from "../components/store/ProductSpecificationTab";
import ProductReviewTab from "../components/store/ProductReviewTab";
import axios from "axios";
import ProductPrice from "../components/store/ProductPrice";

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

  const colorVariants = ["red", "blue", "white-green"];
  const lengthVariants = ["5 meter", "10 meter", "15 meter", "20 meter"];
  const [deliveryInfo, setDeliveryInfo] = useState({});

  const productSpeicifications = {};

  const checkDeliveryHandler = () => {
    console.log("[ProductScreen] Check delivery invoked !!", pinCode);

    // axios
    //   .get(`${process.env.REACT_APP_API_SERVER_URL}${url}`)
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
  // const productDisplayImages = [
  //   {
  //     image_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_1.jpg`,
  //     thumbnail_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_1.jpg`,
  //     text: "Product Image Info",
  //   },
  //   {
  //     image_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_2.jpg`,
  //     thumbnail_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_2.jpg`,
  //     text: "Product Image Info",
  //   },
  //   {
  //     image_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_3.jpg`,
  //     thumbnail_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_3.jpg`,
  //     text: "Product Image Info",
  //   },
  //   {
  //     image_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_4.jpg`,
  //     thumbnail_url: `${process.env.REACT_APP_IMAGE_SERVER_URL}/images/details/products/005/item_005_4.jpg`,
  //     text: "Product Image Info",
  //   },
  // ];

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
        <div classname="product__page">
          <Container>
            <Row>
              <Col md={6}>
                <Carousel>
                  {product.productCarouselMedia.map((productMedia, index) =>
                    productMedia.mediaType === "image" ? (
                      <CarouselItem key={index}>
                        <img
                          className="d-block w-100"
                          src={`${process.env.REACT_APP_MEDIA_SERVER_URL}/media/images/carousel/${productMedia.mediaId}`}
                          alt={productMedia.text}
                          fluid
                        />
                      </CarouselItem>
                    ) : (
                      <CarouselItem key={index}>
                        <video
                          id="vid"
                          autoPlay
                          loop
                          muted
                          width="100%"
                          height="100%"
                          controls
                          poster={`${process.env.REACT_APP_MEDIA_SERVER_URL}/media/images/carousel/${product.productPrimaryImage}`}
                          onclick={() => {}}
                        >
                          <source
                            src={`${process.env.REACT_APP_MEDIA_SERVER_URL}/media/videos/low/${productMedia.mediaId}`}
                            type="video/mp4"
                          />
                        </video>
                      </CarouselItem>
                    )
                  )}
                </Carousel>
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
                <div className="product__info__purchase_options py-2">
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
                    className="btn-block"
                    type="button"
                    variant="success"
                    disabled={product.productStock === 0}
                  >
                    {"Buy Now"}
                  </Button>
                </div>
              </Col>
            </Row>
            <Card variant="flush"></Card>
          </Container>
          {/* <Row>
            <ProductTabs></ProductTabs>
          </Row>
          <Row>
          <BlockProductsCarousel title="Related Products" layout="grid-4-sm" products={products} withSidebar />
          </Row> */}
          <div className="product-tabs">
            <Tabs defaultActiveKey="description">
              <Tab
                className="product-tabs__item"
                eventKey="description"
                title="Description"
              >
                <div className="product-tabs__content">
                  <ProductDescriptionTab product={product} />
                </div>
              </Tab>
              <Tab
                className="product-tabs__item"
                eventKey="speification"
                title="Specification"
              >
                <div className="product-tabs__content">
                  <ProductSpecificationTab product={product} />
                </div>
              </Tab>
              <Tab
                className="product-tabs__item"
                eventKey="reviews"
                title="Reviews"
              >
                <div className="product-tabs__content">
                  <ProductReviewTab product={product} />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductScreen;
