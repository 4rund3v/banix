import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Card, Col } from "react-bootstrap";
import PageBreadcrumb from "../shared/PageBreadcrumb";
import BlockMap from "../shared/BlockMap";

const SitePageAboutUs = () => {
  return (
    <div className="block about-us">
      <Helmet>
        <title>{`About Us — Banix`}</title>
      </Helmet>

      <div
        className="about-us__image"
        style={{ backgroundImage: 'url("images/about_us.jpg")' }}
      />
      <Container>
        <Row className="justify-content-center">
          <Col className="col-12 col-xl-10">
            <div className="about-us__body">
              <h3 className="about-us__title">About Us</h3>
              <div className="about-us__text typography">
                <p>
                  Banix is an electronics design and manufacturing company. We
                  mainly look for manufacturing Innovative Products that do not
                  exist in the market. We mainly develop consumer electronics
                  implemented with the latest technologies so that they can be
                  controlled wirelessly through mobile apps and the internet. We
                  providing job careers and our business is a very challenging
                  and advancers job site.
                </p>

                <p>
                  As we are an Indian based company, we understand Indian users
                  mentalities and design our products as per their expectations
                  and requirements. our purpose is to develop products with
                  international standards at a reasonable price. And to give the
                  right platform to utilize and improve an individual’s skills
                  by working here.
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SitePageAboutUs;
