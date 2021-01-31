import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Image,
  Button,
  Form,
  FormControl,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BanixBanner from "./BanixBanner";
import { GUEST_USER_IMAGE } from "../../config";

const Header = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">banix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <InputGroup>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon1"
                  />
                  <InputGroup.Append>
                    <div class="input-group-text bg-transparent">
                      <FontAwesomeIcon icon="search" />
                    </div>
                  </InputGroup.Append>
                </InputGroup>

                <Nav.Link href="#home">Cart</Nav.Link>
                <Nav.Link href="#link">Link</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
