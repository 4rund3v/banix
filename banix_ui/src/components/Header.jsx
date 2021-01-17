import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import BanixBanner from "./BanixBanner";
import UserPic from "./UserPic";
import SearchBox from "./SearchBox";
import MyCart from "./MyCart";
import SignIn from "./SignIn";

class Header extends Component {
  state = {};
  render() {
    return (
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <BanixBanner />
        </Navbar.Brand>
        <SearchBox />
        <Nav className="mr-auto">
          <Nav.Link href="#SignIn">
            <SignIn />
          </Nav.Link>
          <Nav.Link href="#cart">
            <MyCart />
          </Nav.Link>
          <Nav.Link href="#userPic">
            <UserPic />
          </Nav.Link>
        </Nav>
      </Navbar>
    );
  }
}

export default Header;
