import React from "react";

import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// components
import SearchBox from "./SearchBox";
import AccountInfo from "./AccountInfo";

const Header = () => {
  return (
    <Navbar bg="primary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-dark font-weight-bold">
            banix
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto align-items-center justify-content-center">
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="rounded-0"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBox />
            <LinkContainer to="/cart">
              <Nav.Link>
                <Button className="btn round-btn">
                  <FontAwesomeIcon icon="shopping-cart" />
                </Button>
              </Nav.Link>
            </LinkContainer>
            <AccountInfo />
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
