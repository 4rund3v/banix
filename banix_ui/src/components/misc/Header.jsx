import React from "react";
import { Navbar, Nav, Container, Row, Col, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SearchBox from "./SearchBox";
import { logout } from "../../actions/userActions";

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
    <Container fluid>
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
                {userInfo ? (
                  <NavDropdown title={userInfo.display_name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orders">
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      LogOut
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <LinkContainer to="/login">
                    <Nav.Link className="pr-2">
                      <FontAwesomeIcon icon="user" />
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
