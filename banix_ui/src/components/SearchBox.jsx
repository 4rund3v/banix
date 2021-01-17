import React, { ReactFragment, Component } from "react";
import { Navbar, Nav, Form, InputGroup, Col } from "react-bootstrap";

class SearchBox extends Component {
  state = {};
  render() {
    return (
      <Form.Group as={Col}>
        <InputGroup>
          <Form.Control type="text" placeholder="Search here.." />
          <InputGroup.Append>
            <InputGroup.Text>
              <i className="fab fa-searchengin"></i>
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  }
}

export default SearchBox;
