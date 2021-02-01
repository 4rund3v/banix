import React from "react";
import {
  Navbar,
  Nav,
  Container,
  FormControl,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <Container>
      <Row>
        <Col>
          <Navbar bg="primary">
            <LinkContainer to="/">
              <Navbar.Brand>banix</Navbar.Brand>
            </LinkContainer>
            <Nav>
              <InputGroup>
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  aria-describedby="basic-addon1"
                />
                <InputGroup.Append>
                  <div className="input-group-text bg-transparent">
                    <FontAwesomeIcon icon="search" />
                  </div>
                </InputGroup.Append>
              </InputGroup>
            </Nav>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto ">
                <LinkContainer to="/cart">
                  <Nav.Link className="pr-2">
                    <FontAwesomeIcon icon="shopping-cart" />
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link className="pr-2">
                    <FontAwesomeIcon icon="user" />
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
