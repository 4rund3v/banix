import React, { ReactFragment, Component } from "react";
import { Carousel, Row } from "react-bootstrap";
import { offers } from "../services/offers";

class OffersBanner extends Component {
  state = {
    items: [],
  };

  componentDidMount() {
    console.log("Component Did Mount is :: ", offers);
    this.setState({ items: offers });
  }

  prepareCarousel() {
    /*
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="holder.js/800x400?text=Second slide&bg=282c34"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item> 
      */
    const carouselItems = this.state.items.map((item) => {
      console.log("The item to add to carousel is :: ", item);
      return (
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={item.img_src}
            alt={item.img_text}
            height="300"
            width="1280"
          />
          <Carousel.Caption>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      );
    });
    return (
      <Row>
        <Carousel>{carouselItems}</Carousel>
      </Row>
    );
  }
  render() {
    console.log(" The offers getting loaded : ", this.state.items);
    const carousel = this.prepareCarousel();
    console.log(" The offers getting loaded : ", carousel);
    return carousel;
  }
}
export default OffersBanner;
