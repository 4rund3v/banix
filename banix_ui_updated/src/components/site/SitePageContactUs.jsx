// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// blocks
import BlockMap from "../blocks/BlockMap";
// data stubs
import theme from "../../data/theme";

const SitePageContactUs = () => {
  const breadcrumb = [
    { title: "Home", url: "" },
    { title: "Contact Us", url: "" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Contact Us — ${theme.name}`}</title>
      </Helmet>
      <BlockMap />
      <PageHeader header="Contact Us" breadcrumb={breadcrumb} />
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
                        <FontAwesomeIcon
                          icon="map-marker-alt"
                          className="mr-2"
                        />
                        <span>
                          25/1, Banix, Infant Mercy Ground floor Mallappa
                          Layout,
                        </span>
                        <br />
                        <span>Seegehalli, K R Puram,</span>
                        <br />
                        <span>Bangalore 560049, Karnataka.</span>
                        <br />
                        <FontAwesomeIcon icon="envelope" className="mr-2" />
                        <a
                          href={`mailto:${theme.contacts.email}?Subject=Information%20Please`}
                        >
                          {theme.contacts.email}
                        </a>
                        <br />
                        <FontAwesomeIcon icon="phone" className="mr-2" />
                        <a href={`tel:${theme.contacts.phone}`}>
                          {theme.contacts.phone}
                        </a>
                      </p>

                      <p>
                        <strong>Opening Hours</strong>
                        <br />
                        Monday to Sat: 8:00am - 5:00pm
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
