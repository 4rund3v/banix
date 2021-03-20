import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Newsletter from "./NewsLetter";

import {
  BANIX_FACEBOOK_URL,
  BANIX_TWITTER_URL,
  BANIX_INSTAGRAM_URL,
  BANIX_YOUTUBE_URL,
  BANIX_LINKEDIN_URL,
} from "../../config";

function Footer() {
  return (
    <footer className="mt-2">
      <Container>
        <Row className="bg-light text-dark ">
          <Col>
            <h5 className="font-weight-bold">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/site/terms">Terms and Conditions</Link>
              </li>
              <li>
                <Link to="/site/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/site/faq">FAQ</Link>
              </li>
              <li>
                <Link to="/site/careers">Careers</Link>
              </li>
              <li>
                <Link to="/site/contact-us">Contact Us</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <h5 className="font-weight-bold">Information</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/site/shipping">Shipping</Link>
              </li>
              {/* <li>
                                <Link to="/site/support">Support</Link>
                            </li> */}
              <li>
                <Link to="/site/returns">Returns</Link>
              </li>
              <li>
                <Link to="/site/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/site/refund-policy">Refund Policy</Link>
              </li>
              <li>
                <Link to="/site/warranty">Warranty</Link>
              </li>
            </ul>
          </Col>
          <Col>
            <Newsletter />
            <p>
              <FontAwesomeIcon icon="envelope" className="mr-2" />
              <a href="mailto:care@banix.in?Subject=Help">care@banix.in</a>
              <FontAwesomeIcon icon="phone" className="ml-2" />
              <a href="tel:+917411607657">+91 7411607657</a>
            </p>
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
              <li className="list-inline-item">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={BANIX_LINKEDIN_URL}
                >
                  <FontAwesomeIcon
                    icon={["fab", "linkedin-in"]}
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
