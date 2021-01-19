import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SignIn extends Component {
  state = {};
  render() {
    return (
      <Button variant="light">
        Sign In
        <span>
          <i className="fas fa-shopping-cart"></i>
        </span>
      </Button>
    );
  }
}

export default SignIn;
