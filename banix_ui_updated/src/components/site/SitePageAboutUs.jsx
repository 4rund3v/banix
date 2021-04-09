// react
import React from "react";
// third-party
import { Helmet } from "react-helmet-async";
// data stubs
import theme from "../../data/theme";

const SitePageAboutUs = () => {
  return (
    <div className="block about-us">
      <Helmet>
        <title>{`About Us — ${theme.name}`}</title>
      </Helmet>

      <div
        className="about-us__image"
        style={{ backgroundImage: 'url("images/about-us-alt.jpg")' }}
      />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="about-us__body">
              <h1 className="about-us__title">About Us</h1>
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
                <h3>Our Purpose</h3>
                <p>
                  As we are an Indian based company, we understand Indian user’s
                  mentalities. We design and develop our products as per their
                  expectations and requirements.
                  <br />
                  Our purpose is to develop our products with international
                  standards at a reasonable price and to make it in India, and
                  to give a right platform to utilize and improve individual’s
                  skills by working here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitePageAboutUs;
