import React from "react";
import Rating from "./Rating";

const ProductReviewTab = () => {
  const reviewsList = (
    <>
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
      </li>{" "}
    </>
  );
  return (
    <div className="reviews-view">
      <h3 className="reviews-view__header">Customer Reviews</h3>
      <div className="reviews-view__list">
        <ol className="reviews-list__content">{reviewsList}</ol>
      </div>
    </div>
  );
};

export default ProductReviewTab;
