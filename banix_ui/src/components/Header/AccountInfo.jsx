import React from "react";
// third party
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// actions
import { logout } from "../../actions/customerActions";

const AccountInfo = () => {
  const dispatch = useDispatch();
  const customerLogin = useSelector((state) => state.customerLogin);
  const { customerInfo } = customerLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <React.Fragment>
      {customerInfo ? (
        <NavDropdown title={customerInfo.displayName} id="displayName">
          <LinkContainer to="/account">
            <NavDropdown.Item>Account</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/orders">
            <NavDropdown.Item>Orders</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Sign Out</NavDropdown.Item>
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
    </React.Fragment>
  );
};

export default AccountInfo;
