import React from "react";
import { Nav } from "react-bootstrap";

const SideBar = () => {
  return (
    <>
      <Nav
        className="col-md-12 d-none d-md-block bg-light sidebar"
        activeKey="/homescreen"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <div className="sidebar-sticky"></div>
        <Nav.Item>
          <Nav.Link href="/homescreen">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="DashBoard">DashBoard</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Products">Products</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Customers">Customers</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="Orders">Orders</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            Reviews
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </>
  );
};

export default SideBar;
