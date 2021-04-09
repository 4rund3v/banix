// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
const SitePageCareers = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Careers", url: "/site/careers" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Careers — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Careers at Banix</h1>
            </div>
            <div className="document__content typography">
              <p>
                <span>
                  We dont have any open positions right now Check back soon!
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SitePageCareers;
