import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Collapse,
  Container,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BanixBanner from "./BanixBanner";
import UserPic from "./UserPic";
import SearchBox from "./SearchBox";
import MyCart from "./MyCart";
import SignIn from "./SignIn";

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar expand="lg" variant="dark" bg="primary" collapseOnSelect>
        <Container className="mx-auto">
          <Navbar.Brand
            href="/"
            tag={Link}
            to={"/"}
            className="mr-4 text-dark font-weight-bold"
          >
            banix
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-bav">
            <Nav className="ml-auto">
              <Nav.Link href="/cart">
                <FontAwesomeIcon icon="shopping-cart" />
                Cart
              </Nav.Link>
              <Nav.Link href="/login">Sign in</Nav.Link>
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
  }
}

export default Header;
