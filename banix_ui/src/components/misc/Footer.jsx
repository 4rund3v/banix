import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Newsletter from "./NewsLetter";

function Footer() {
  return (
    <footer>
      <Container>
        <Row className="bg-light text-dark ">
          <Col>
            <h5 className="font-weight-bold">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/order_tracking">Order Tracking</Link>
              </li>
              <li>
                <Link to="/returns_and_exchanges">Returns and Exchanges</Link>
              </li>
              <li>
                <Link to="/refunds">Refunds</Link>
              </li>
              <li>
                <Link to="/delivery_and_collections">
                  Delivery & Collections
                </Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className="font-weight-bold">Information</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Use</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <Newsletter />
            <ul className="list-inline mt-4">
              <li className="list-inline-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    size="2x"
                    className="pr-2"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    size="2x"
                    className="pr-2"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={["fab", "linkedin"]}
                    size="2x"
                    className="pr-2"
                  />
                </Link>
              </li>
              <li className="list-inline-item">
                <Link to="/">
                  <FontAwesomeIcon
                    icon={["fab", "pinterest"]}
                    size="2x"
                    className="pr-2"
                  />
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
