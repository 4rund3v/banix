import React from "react";
import { Helmet } from "react-helmet";
import PageBreadcrumb from "../shared/PageBreadcrumb";

const SitePageRefundPolicy = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Refund Policy", url: "/site/refund-policy" },
  ];
  return (
    <div>
      <Helmet>
        <title>{`Refund Policy — Banix`}</title>
      </Helmet>
      <PageBreadcrumb breadcrumb={breadcrumb} />
      <div className="document">
        <div className="document__header">
          <h2 className="document__title">Refund Policy</h2>
          <div className="document__subtitle">
            This Agreement was last modified on 26 Feb 2021.
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
                Refund will be processed based on the mode of payment and will
                be refunded within 7 working days.
              </li>
              <li>
                In case of Cash On Delivery : We will send a refund cheque. The
                cheque will be made in favor of the name as in the "billing
                name" provided at the time of placing the order.
              </li>
            </ul>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitePageRefundPolicy;
