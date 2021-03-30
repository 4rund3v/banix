import React, { Component, useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Collapse,
  CardHeader,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

//Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";

//Import Product Images
import product1 from "../../assets/images/product/banix_prod_1.jpg";
import product2 from "../../assets/images/product/banix_prod_2.jpg";
import product3 from "../../assets/images/product/banix_prod_3.jpg";
import product4 from "../../assets/images/product/banix_prod_4.jpg";
import product5 from "../../assets/images/product/banix_prod_5.jpg";
import product6 from "../../assets/images/product/banix_prod_3.jpg";

const ProductsPage = () => {
  const [fileterCategory, setFileterCategory] = useState("#");
  const [discount, setDiscount] = useState(false);
  const [rating, setRating] = useState(false);
  return (
    <React.Fragment>
      <Container fluid>
        <Row>
          <Col xl={3} lg={4}>
            <Card>
              <CardHeader className="bg-transparent border-bottom">
                <h5 className="mb-0">Filters</h5>
              </CardHeader>

              <CardBody>
                <h5 className="font-size-14 mb-3">Categories</h5>

                <div
                  id="accordion"
                  className="custom-accordion categories-accordion mb-3"
                >
                  <div className="categories-group-card">
                    <Link
                      to="#"
                      onClick={() => setFileterCategory("#")}
                      className={
                        fileterCategory === "electronic"
                          ? "categories-group-list accordian-bg-products"
                          : "categories-group-list"
                      }
                    >
                      <i className="mdi mdi-desktop-classic font-size-16 align-middle mr-2"></i>{" "}
                      Electronic
                      <i
                        className={
                          fileterCategory === true
                            ? "mdi mdi-minus float-right accor-minus-icon"
                            : "mdi mdi-plus float-right accor-plus-icon"
                        }
                      ></i>
                    </Link>

                    <Collapse
                      isOpen={fileterCategory === "electronic"}
                      id="collapseOne"
                    >
                      <div>
                        <ul className="list-unstyled categories-list mb-0">
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium mr-1"></i> Led
                              LightStrip
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium mr-1"></i> Led
                              Bulb
                            </Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="mdi mdi-circle-medium mr-1"></i> Led
                              Accessories
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </Collapse>
                  </div>
                </div>
              </CardBody>

              <CardBody className="border-top">
                <div>
                  <h5 className="font-size-14 mb-4">Price</h5>
                  <br />
                  <Nouislider
                    range={{ min: 0, max: 600 }}
                    tooltips={true}
                    start={[100, 500]}
                    connect
                  />
                </div>
              </CardBody>

              <div className="custom-accordion">
                <CardBody className="border-top">
                  <div>
                    <h5 className="font-size-14 mb-0">
                      <Link
                        to="#"
                        className="text-dark d-block"
                        onClick={() => setDiscount(!discount)}
                      >
                        Discount{" "}
                        <i
                          className={
                            discount === true
                              ? "mdi mdi-minus float-right accor-minus-icon"
                              : "mdi mdi-plus float-right accor-plus-icon"
                          }
                        ></i>
                      </Link>
                    </h5>

                    <Collapse isOpen={discount} id="collapseExample1">
                      <div className="mt-4">
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio6"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio6"
                          >
                            50% or more
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio5"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio5"
                          >
                            40% or more
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio4"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio4"
                          >
                            30% or more
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio3"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio3"
                          >
                            20% or more
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio2"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio2"
                          >
                            10% or more
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productdiscountRadio1"
                            name="productdiscountRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productdiscountRadio1"
                          >
                            Less than 10%
                          </Label>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </CardBody>

                <CardBody className="border-top">
                  <div>
                    <h5 className="font-size-14 mb-0">
                      <Link
                        to="#"
                        className="collapsed text-dark d-block"
                        onClick={() => setRating(!rating)}
                      >
                        Customer Rating{" "}
                        <i
                          className={
                            rating === true
                              ? "mdi mdi-minus float-right accor-minus-icon"
                              : "mdi mdi-plus float-right accor-plus-icon"
                          }
                        ></i>
                      </Link>
                    </h5>

                    <Collapse isOpen={rating} id="collapseExample3">
                      <div className="mt-4">
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productratingRadio1"
                            name="productratingRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productratingRadio1"
                          >
                            4 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productratingRadio2"
                            name="productratingRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productratingRadio2"
                          >
                            3 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productratingRadio3"
                            name="productratingRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productratingRadio3"
                          >
                            2 <i className="mdi mdi-star text-warning"></i> &
                            Above
                          </Label>
                        </div>
                        <div className="custom-control custom-radio mt-2">
                          <Input
                            type="radio"
                            id="productratingRadio4"
                            name="productratingRadio1"
                            className="custom-control-input"
                          />
                          <Label
                            className="custom-control-label"
                            htmlFor="productratingRadio4"
                          >
                            1 <i className="mdi mdi-star text-warning"></i>
                          </Label>
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </CardBody>
              </div>
            </Card>
          </Col>
          <Col lg={9}>
            <Card>
              <CardBody>
                <div>
                  <Row>
                    <Col md={6}>
                      <div>
                        <h5>Smart LEDs</h5>
                        <Breadcrumb listClassName="p-0 bg-transparent mb-2">
                          <BreadcrumbItem>
                            <Link to="#">Electronics</Link>
                          </BreadcrumbItem>
                          <BreadcrumbItem>
                            <Link to="#">Leds</Link>
                          </BreadcrumbItem>
                        </Breadcrumb>
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="form-inline float-md-right">
                        <div className="search-box ml-2">
                          <div className="position-relative">
                            <Input
                              type="text"
                              className="form-control rounded"
                              placeholder="Search..."
                            />
                            <i className="mdi mdi-magnify search-icon"></i>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <ul className="list-inline my-3 ecommerce-sortby-list">
                    <li className="list-inline-item">
                      <span className="font-weight-medium font-family-secondary">
                        Sort by:
                      </span>
                    </li>
                    <li className="list-inline-item active ml-1">
                      <Link to="#">Popularity</Link>
                    </li>
                    <li className="list-inline-item ml-1">
                      <Link to="#">Newest</Link>
                    </li>
                    <li className="list-inline-item ml-1">
                      <Link to="#">Discount</Link>
                    </li>
                  </ul>

                  <Row className="no-gutters">
                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-ribbon badge badge-warning">
                            Trending
                          </div>
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart-outline"></i>
                            </Link>
                          </div>
                          <img
                            src={product1}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">
                            Blue color, T-shirt
                          </p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Led Strip
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">Rs 1240</h5>
                        </div>
                      </div>
                    </Col>

                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-ribbon badge badge-primary">
                            - 25 %
                          </div>
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart-outline"></i>
                            </Link>
                          </div>
                          <img
                            src={product2}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">Led Light Strip</p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Led Light Strip{" "}
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">
                            <span className="text-muted mr-2">
                              <del>Rs 1240</del>
                            </span>
                            Rs 1225
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart text-danger"></i>
                            </Link>
                          </div>
                          <img
                            src={product3}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">Led Light Strip</p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Led Light Strip{" "}
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">
                            <span className="text-muted mr-2">
                              <del>$290</del>
                            </span>
                            $275
                          </h5>
                        </div>
                      </div>
                    </Col>
                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart-outline"></i>
                            </Link>
                          </div>
                          <img
                            src={product4}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">Led Light Strip</p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Hoodie (Green)
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">
                            <span className="text-muted mr-2">
                              <del>$290</del>
                            </span>
                            $275
                          </h5>
                        </div>
                      </div>
                    </Col>

                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart text-danger"></i>
                            </Link>
                          </div>
                          <img
                            src={product5}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">Led Light Strip </p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Led Light Strip{" "}
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">$242</h5>
                        </div>
                      </div>
                    </Col>
                    <Col xl={4} sm={6}>
                      <div className="product-box">
                        <div className="product-img">
                          <div className="product-ribbon badge badge-primary">
                            - 22 %
                          </div>
                          <div className="product-like">
                            <Link to="#">
                              <i className="mdi mdi-heart-outline"></i>
                            </Link>
                          </div>
                          <img
                            src={product6}
                            alt=""
                            className="img-fluid mx-auto d-block"
                          />
                        </div>

                        <div className="text-center">
                          <p className="font-size-12 mb-1">Led Light Strip</p>
                          <h5 className="font-size-15">
                            <Link to="#" className="text-dark">
                              Led Light Strip{" "}
                            </Link>
                          </h5>

                          <h5 className="mt-3 mb-0">
                            <span className="text-muted mr-2">
                              <del>$240</del>
                            </span>
                            $225
                          </h5>
                        </div>
                      </div>
                    </Col>
                  </Row>

                  <Row className="mt-4">
                    <Col sm={6}>
                      <div>
                        <p className="mb-sm-0 mt-2">
                          Page <span className="font-weight-bold">2</span> Of{" "}
                          <span className="font-weight-bold">113</span>
                        </p>
                      </div>
                    </Col>
                    <Col sm={6}>
                      <div className="float-sm-right">
                        <Pagination className="pagination-rounded mb-sm-0">
                          <PaginationItem disabled>
                            <PaginationLink href="#">
                              <i className="mdi mdi-chevron-left"></i>
                            </PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                          </PaginationItem>
                          <PaginationItem active>
                            <PaginationLink href="#">2</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink hrefo="#">4</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">5</PaginationLink>
                          </PaginationItem>
                          <PaginationItem>
                            <PaginationLink href="#">
                              <i className="mdi mdi-chevron-right"></i>
                            </PaginationLink>
                          </PaginationItem>
                        </Pagination>
                      </div>
                    </Col>
                  </Row>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ProductsPage;
