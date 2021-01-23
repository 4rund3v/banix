import React, { Component } from "react";
import { Form, InputGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SearchBox extends Component {
  state = {};
  render() {
    return (
      <Form.Group as={Col}>
        <InputGroup>
          <Form.Control type="text" placeholder="Search here.." />
          <InputGroup.Append>
            <InputGroup.Text>
              <FontAwesomeIcon icon="search" />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default SearchBox;
