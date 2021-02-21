import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import UpdateProfile from "../components/customer/UpdateProfile";
import UpdateShippingInfo from "../components/customer/UpdateShippingInfo";

const ProfileScreen = () => {
  return (
    <Row>
      <Col md={4}>
        <Card className="p-3">
          <UpdateProfile />
        </Card>
      </Col>
      <Col md={8}>
        <UpdateShippingInfo />
      </Col>
    </Row>
  );
};

export default ProfileScreen;
