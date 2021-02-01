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
import SearchBox from "./SearchBox";
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
              <SearchBox />
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
