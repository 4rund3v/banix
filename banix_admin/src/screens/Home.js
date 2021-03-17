import React from "react";
import { Container, Row, Col } from "reactstrap";
import Sidebar from "../components/SideBar";

const Home = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          <Col xs={10} id="page-content-wrapper">
            this is a test
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
