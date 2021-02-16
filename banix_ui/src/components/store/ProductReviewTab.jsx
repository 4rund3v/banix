import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import Rating from "./Rating";

const ProductReviewTab = () => {
  return (
    <div className="reviews-view typography">
      <h3>Customer Reviews</h3>
      <ol className="reviews-list__content">
        <li className="reviews-list__item">
          <div className="justify-content-md-left">
            {" "}
            Arun Dev <span className="text-muted">verified Buyer</span>
            <Rating ratingValue={4} />
            <div className="review__text">
              {
                "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
              }
            </div>
            <div className=" review__date">{"27 May, 2018"}</div>
          </div>
        </li>
        <li className="reviews-list__item">
          <div className="justify-content-md-left">
            {" "}
            Jhon Marshal <span className="text-muted">verified Buyer</span>
            <Rating ratingValue={4} />
            <div className="review__text">
              {
                "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
              }
            </div>
            <div className=" review__date">{"27 May, 2018"}</div>
          </div>
        </li>
        <li className="reviews-list__item">
          <div className="justify-content-md-left">
            {" "}
            Pavithra <span className="text-muted">verified Buyer</span>
            <Rating ratingValue={4} />
            <div className=" review__text">
              {
                "Phasellus id mattis nulla. Mauris velit nisi, imperdiet vitae sodales in, maximus ut lectus. Vivamus commodo scelerisque lacus, at porttitor dui iaculis id. Curabitur imperdiet ultrices fermentum."
              }
            </div>
            <div className=" review__date">{"27 May, 2018"}</div>
          </div>
        </li>
      </ol>
    </div>
  );
};

export default ProductReviewTab;
