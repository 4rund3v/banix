import React, { Component } from "react";
import {
  Navbar,
  Nav,
  Container,
  Image,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BanixBanner from "./BanixBanner";
import { GUEST_USER_IMAGE } from "../../config";

const Header = () => {
  return (
    <Navbar variant="dark" bg="primary">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>
            <BanixBanner />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-bav">
          <Nav className="align-items-center justify-content-center">
            <Nav.Item>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2"
                />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Nav.Item>
          </Nav>
          <Nav className="ml-auto">
            <LinkContainer to="/cart">
              <Nav.Link>
                <h4>
                  <FontAwesomeIcon icon="shopping-cart" />
                  Cart
                </h4>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/login">
              <Nav.Link>
                <h4>
                  <Image
                    src={`${GUEST_USER_IMAGE}`}
                    alt={"userimage"}
                    height={20}
                    width={20}
                    fluid
                  ></Image>
                  Sign in
                </h4>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>

        {/* <Collapse  navbar> isOpen={this.state.isOpen}
                      
            <Nav className="align-items-center justify-content-center">
              <NavItem>
                <div id="searchBox">{ <SearchForm /> }</div>
              </NavItem>
            </Nav>
            <Nav className="ml-auto align-items-center justify-content-center">
              <NavItem>
                <div id="cartCount">
                  {<Link to="/cart" className="text-light">
                    <FontAwesomeIcon icon="shopping-cart" />
                    <span className="font-weight-bold"> Cart</span> (
                    {this.cartItemCount()})
                  </Link> }
                </div>
              </NavItem>
            </Nav>
            <Nav className="align-items-center justify-content-center">
              <NavItem>
                {this.props.isAuthenticated ? (
                  <ButtonGroup id="authBtnGroup">
                    {<Link to="/profile" className="btn btn-sm btn-success">
                      {decoded_token.username !== "" // if user has username...
                        ? decoded_token.username // display it or use email
                        : decoded_token.email}{" "}
                      <FontAwesomeIcon icon="user" />
                    </Link> }
                    <Button
                      className="btn btn-sm btn-warning"
                      onClick={this.props.authLogout}
                    >
                      Logout <FontAwesomeIcon icon="sign-out-alt" />
                    </Button>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup>
                    <Link to="/login" className="btn btn-sm btn-warning">
                      Login <FontAwesomeIcon icon="sign-in-alt" />
                    </Link>
                    <Link to="/register" className="btn btn-sm btn-info">
                      Register <FontAwesomeIcon icon="user-plus" />
                    </Link>
                  </ButtonGroup>
                )}
              </NavItem>
            </Nav>
          </Collapse>  */}
      </Container>
    </Navbar>
  );
};

export default Header;
