import React from "react";
// third party
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Button,
  Dropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
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

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {/* Render custom icon here */}
      &#x25bc;
      {children}
    </a>
  ));
  return (
    <React.Fragment>
      {customerInfo ? (
        <>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <FontAwesomeIcon icon="user" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/account">Account</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/orders">Orders</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler}>
                <Link to="">Sign Out</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* <Dropdown>
            <Dropdown.Toggle id="displayNameAccount">
              <FontAwesomeIcon icon="user" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">
                <LinkContainer to="/account">Account</LinkContainer>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2">Orders</Dropdown.Item>
              <Dropdown.Item eventKey="3">
                <LinkContainer to="/account">Sign Out</LinkContainer>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          {/* <NavDropdown id="displayName">
            <LinkContainer to="/account">
              <NavDropdown.Item>Account</NavDropdown.Item>
            </LinkContainer>
            <LinkContainer to="/orders">
              <NavDropdown.Item>Orders</NavDropdown.Item>
            </LinkContainer>
            <NavDropdown.Item onClick={logoutHandler}>
              Sign Out
            </NavDropdown.Item>
          </NavDropdown> */}
        </>
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
