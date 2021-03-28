import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import EarningReports from "../dashboard/EarningReports";
import LatestTransactions from "../dashboard/LatestTransactions";
import MiniComponenets from "../dashboard/MiniComponenets";
import RevenueAnalytics from "../dashboard/RevenueAnalytics";
import SalesAnalytics from "../dashboard/SalesAnalytics";
import Sources from "../dashboard/Sources";

const DashboardPage = () => {
  return (
    //
    <Container fluid>
      <Row>
        <Col xl={8}>
          <Row>
            <MiniComponenets />
          </Row>
          <RevenueAnalytics />
        </Col>
        <Col xl={4}>
          {/* sales Analytics */}
          <SalesAnalytics />
          {/* earning reports */}
          <EarningReports />
        </Col>
      </Row>
      <Row>
        {/* sources */}
        <Sources />

        {/* revenue by locations */}
        <LatestTransactions />
      </Row>
    </Container>
  );
};

export default DashboardPage;
