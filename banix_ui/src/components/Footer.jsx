import React from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer>
      <Container className="text-center py-3">
        Copyright @ banix 2021
        <div className="d-flex flex-column flex-md-row flex-wrap">
          <div className="mr-5">
            <h5 className="font-weight-bold">Customer Service</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/order_tracking">Order Tracking</a>
              </li>
              <li>
                <a href="/returns_and_exchanges">Returns and Exchanges</a>
              </li>
              <li>
                <a href="/refunds">Refunds</a>
              </li>
              <li>
                <a href="/delivery_and_collections">Delivery & Collections</a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-weight-bold">Information</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/terms">Terms of Use</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
