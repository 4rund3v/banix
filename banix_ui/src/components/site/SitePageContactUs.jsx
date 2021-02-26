import React from "react";

import PageBreadcrumb from "../shared/PageBreadcrumb";
import BlockMap from "../shared/BlockMap";
import { Helmet } from "react-helmet";
import { Container, Row } from "react-bootstrap";

const SitePageContactUs = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Contact Us", url: "/site/contact-us" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Contact Us — Banix}`}</title>
      </Helmet>

      <BlockMap />

      <PageBreadcrumb header="Contact Us" breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="card mb-0">
            <div className="card-body contact-us">
              <div className="contact-us__container">
                <div className="row">
                  <div className="col-12 col-lg-6 pb-4 pb-lg-0">
                    <h4 className="contact-us__header card-title">
                      Our Address
                    </h4>

                    <div className="contact-us__address">
                      <p>
                        <span>
                          25/1, Infant Mercy Ground floor Mallappa Layout,
                        </span>
                        <br />
                        <span>Seegehalli, K R Puram,</span>
                        <br />
                        <span>Bangalore 560049, Karnataka.</span>
                        <br />
                        Email: support@banix.in
                        <br />
                        Phone Number: +91 9999999999
                      </p>

                      <p>
                        <strong>Opening Hours</strong>
                        <br />
                        Monday to Friday: 8am-8pm
                        <br />
                        Saturday: 8am-6pm
                        <br />
                        Sunday: 10am-4pm
                      </p>

                      <p>
                        <strong>Comment</strong>
                        <br />
                        Contact Us if you have any queries on the products.
                      </p>
                    </div>
                  </div>

                  <div className="col-12 col-lg-6">
                    <h4 className="contact-us__header card-title">
                      Leave us a Message
                    </h4>

                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="form-name">Your Name</label>
                          <input
                            type="text"
                            id="form-name"
                            className="form-control"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="form-email">Email</label>
                          <input
                            type="email"
                            id="form-email"
                            className="form-control"
                            placeholder="Email Address"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-subject">Subject</label>
                        <input
                          type="text"
                          id="form-subject"
                          className="form-control"
                          placeholder="Subject"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="form-message">Message</label>
                        <textarea
                          id="form-message"
                          className="form-control"
                          rows="4"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SitePageContactUs;
