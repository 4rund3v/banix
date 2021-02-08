import React, { useState } from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";

const ProductImageGallery = ({ productImageList }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  const expanded = false;
  const toggleExpanded = () => {};
  return (
    <div>
      {productImageList ? (
        <div>
          <div className="image-gallery-wrapper">
            <span aria-hidden="true" className="carousel-control-prev-icon" />
            <Carousel
              indicators={expanded ? true : false}
              fade={true}
              slide={false}
              interval={null}
              wrap={false}
              prevIcon={
                <span
                  aria-hidden="true"
                  className="carousel-control-prev-icon"
                />
              }
              className="image-gallery-carousel"
              id="image-gallery-carousel"
              activeIndex={index}
              onSelect={handleSelect}
            >
              {productImageList
                ? productImageList.map((productImage) => (
                    <Carousel.Item>
                      <img
                        src={productImage.image_url}
                        className="image-gallery-carousel-images"
                        onClick={toggleExpanded}
                        alt={productImage.text}
                      />
                    </Carousel.Item>
                  ))
                : null}
            </Carousel>
          </div>
          <div className={"image-gallery-thumb-container"}>
            {productImageList
              ? productImageList.map((productImage, i) => (
                  <div
                    className={
                      index === i
                        ? "image-gallery-thumb-selected"
                        : "image-gallery-thumb"
                    }
                  >
                    <img
                      className="image-gallery-thumb-image"
                      key={i}
                      value={i}
                      src={productImage.thumbnail_url}
                      alt={productImage.text}
                      onClick={(e) => handleSelect(i, e)}
                    />
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductImageGallery;
