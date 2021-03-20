import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Col } from "react-bootstrap";
import PageBreadcrumb from "../shared/PageBreadcrumb";
const SitePageCareers = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Careers", url: "/site/careers" },
  ];
  return (
    <div className="block careers">
      <Helmet>
        <title>{`Careers — Banix`}</title>
      </Helmet>

      <PageBreadcrumb header="Careers" breadcrumb={breadcrumb} />
      <div
        className="career__image"
        style={{ backgroundImage: 'url("images/join_our_team.jpg")' }}
      />
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12 col-xl-10">
            <div className="career__body">
              <h3 className="career__title">Join Our Team</h3>
              <div className="career__text typography">
                <p>
                  We dont have any open positions right now Check back soon!
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SitePageCareers;
