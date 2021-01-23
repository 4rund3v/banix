import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import { Button } from "react-bootstrap";

class SignIn extends Component {
  state = {};
  render() {
    return (
      <Button variant="light">
        <FontAwesomeIcon icon="user" />
        Sign In
      </Button>
    );
  }
}

export default SignIn;
