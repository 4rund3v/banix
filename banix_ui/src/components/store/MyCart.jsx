import React, { Component } from "react";
import { Button } from "react-bootstrap";

class MyCart extends Component {
  state = {};
  render() {
    return (
      <Button variant="light">
        My Cart
        <span>
          <i class="fas fa-shopping-cart"></i>
        </span>
      </Button>
    );
  }
}

export default MyCart;
