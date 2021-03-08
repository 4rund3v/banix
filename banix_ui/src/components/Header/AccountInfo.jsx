import React from "react";
// third party
import { useDispatch, useSelector } from "react-redux";
import { Nav, Button, Dropdown } from "react-bootstrap";
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

  return (
    <React.Fragment>
      {customerInfo ? (
        <>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <img
                src="images/user-profile.svg"
                alt="user-profile-icon"
                height={25}
              />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/account">Account</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/account/orders">Orders</Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={logoutHandler}>
                <Link to="">Sign Out</Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
