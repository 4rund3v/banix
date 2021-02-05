import React, { Component } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Button, InputGroup } from "react-bootstrap";

export default class Newsletter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/subscribers/`, { email: this.state.email })
      .then((res) => alert("Successfully subscribed!"))
      .catch((err) =>
        alert(`The email ${this.state.email} is already a subscriber!`)
      );
    this.setState({ email: "" }); // clear input after submission
  };

  render() {
    return (
      <React.Fragment>
        <h5 className="font-weight-bold">Subscribe to our newsletter!</h5>
        <Form
          className="form-inline justify-content-center"
          onSubmit={this.handleSubmit}
        >
          {" "}
          <InputGroup>
            <Form.Control type="email" placeholder="Your Email Address" />
            <InputGroup.Append>
              <Button className="btn btn-secondary">
                Subcribe!
                <FontAwesomeIcon icon="paper-plane" />
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form>
      </React.Fragment>
    );
  }
}
