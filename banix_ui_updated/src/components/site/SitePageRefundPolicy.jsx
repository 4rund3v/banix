// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";
const SitePageRefundPolicy = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Refund Policy", url: "/site/refund-policy" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Refund Policy — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Refund Policy</h1>
              <div className="document__subtitle">
                This Agreement was last modified on 26 March 2021.
              </div>
            </div>
            <div className="document__content typography">
              <h3>What is Banix refund policy?</h3>
              <p>
                Refunds: We will process the refund once the user initates the
                refund request.
                <br />
                Regarding the payment refund
                <ul>
                  <li>
                    Refund will be processed based on the mode of payment and
                    will be refunded within 7 working days.
                  </li>
                  <li>
                    In case of Cash On Delivery : We will send a refund cheque.
                    The cheque will be made in favor of the name as in the
                    "billing name" provided at the time of placing the order.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SitePageRefundPolicy;
