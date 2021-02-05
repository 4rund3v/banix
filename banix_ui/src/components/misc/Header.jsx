import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "./SearchBox";
import { logout } from "../../actions/userActions";
import { Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log("[Header] The userinfo is :: ", userInfo);
  const logoutHandler = () => {
    console.log("Logout Invoked");
    dispatch(logout());
  };

  return (
    <Navbar bg="primary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand className="text-dark font-weight-bold">
            banix
          </Navbar.Brand>
        </LinkContainer>
        <Nav className="ml-auto align-items-center justify-content-center">
          <SearchBox />
        </Nav>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="rounded-0" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto ">
            <LinkContainer to="/cart">
              <Nav.Link>
                <Button className="btn round-btn">
                  <FontAwesomeIcon icon="shopping-cart" />
                </Button>
              </Nav.Link>
            </LinkContainer>
            {userInfo ? (
              <NavDropdown title={userInfo.display_name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to="/orders">
                  <NavDropdown.Item>Orders</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <Button className="btn round-btn">
                    <FontAwesomeIcon icon="user" />
                  </Button>
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
