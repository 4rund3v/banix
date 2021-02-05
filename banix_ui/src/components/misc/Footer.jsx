import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Newsletter from "./NewsLetter";

import {
  BANIX_FACEBOOK_URL,
  BANIX_TWITTER_URL,
  BANIX_INSTAGRAM_URL,
  BANIX_YOUTUBE_URL,
} from "../../config";

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
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={BANIX_TWITTER_URL}
                >
                  <FontAwesomeIcon
                    icon={["fab", "twitter"]}
                    size="2x"
                    className="pr-2"
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={BANIX_FACEBOOK_URL}
                >
                  <FontAwesomeIcon
                    icon={["fab", "facebook"]}
                    size="2x"
                    className="pr-2"
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={BANIX_YOUTUBE_URL}
                >
                  <FontAwesomeIcon
                    icon={["fab", "youtube"]}
                    size="2x"
                    className="pr-2"
                  />
                </a>
              </li>
              <li className="list-inline-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={BANIX_INSTAGRAM_URL}
                >
                  <FontAwesomeIcon
                    icon={["fab", "instagram"]}
                    size="2x"
                    className="pr-2"
                  />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>

      <div className="bg-dark text-light">
        <Container className="py-4">
          <div className="d-flex align-items-center">
            <span>&copy; 2021, Banix. All rights reserved. </span>
            <div className="ml-auto">
              <span className="mr-2">
                <FontAwesomeIcon icon={["fab", "cc-visa"]} size="2x" />
              </span>
              <span className="mr-2">
                <FontAwesomeIcon icon={["fab", "cc-mastercard"]} size="2x" />
              </span>
              <FontAwesomeIcon icon={["fab", "cc-paypal"]} size="2x" />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

export default Footer;
