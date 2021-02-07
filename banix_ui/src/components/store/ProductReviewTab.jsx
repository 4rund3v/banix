import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Rating from "./Rating";

const ProductReviewTab = () => {
  return (
    <div className="py-3">
      <p>Customer Reviews</p>
      <Container>
        <Row className="mt-3">
          <p className="justify-content-md-left">
            {" "}
            Arun Dev <span className="text-muted">verified Buyer</span>
          </p>
          <br />
          <Rating ratingValue={4} />
          <div className=" review__text">
            {
              "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
            }
          </div>
          <div className=" review__date">{"27 May, 2018"}</div>
        </Row>
        <Row className="mt-3">
          <p className="justify-content-md-left">
            {" "}
            Jhon Marshal <span className="text-muted">verified Buyer</span>
          </p>
          <br />
          <Rating ratingValue={4} />
          <div className=" review__text">
            {
              "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
            }
          </div>
          <div className=" review__date">{"27 May, 2018"}</div>
        </Row>
        <Row className="mt-3">
          <p className="justify-content-md-left">
            {" "}
            Pavithra <span className="text-muted">verified Buyer</span>
          </p>
          <br />
          <Rating ratingValue={4} />
          <div className=" review__text">
            {
              "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
            }
          </div>
          <div className=" review__date">{"27 May, 2018"}</div>
        </Row>
      </Container>
    </div>
  );
};

export default ProductReviewTab;
