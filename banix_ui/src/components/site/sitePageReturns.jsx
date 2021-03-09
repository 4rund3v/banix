import React from "react";
import { Helmet } from "react-helmet";
import PageBreadcrumb from "../shared/PageBreadcrumb";

const SitePageReturns = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Returns", url: "/site/returns" },
  ];
  return (
    <div>
      <Helmet>
        <title>{`Returns — Banix`}</title>
      </Helmet>
      <PageBreadcrumb breadcrumb={breadcrumb} />
      <div className="document">
        <div className="document__header">
          <h2 className="document__title">Returns</h2>
          <div className="document__subtitle">
            This Agreement was last modified on 26 Feb 2021.
          </div>
        </div>
        <div className="document__content typography">
          <div>
            <p>
              Banix will provide a refund or replacement only if one is
              requested within 7 days of the receipt of your order and only
              under the conditions listen below.
            </p>
            <ol>
              <li>Wrong product received</li>
              <li>Damaged product received</li>
            </ol>{" "}
            <p>
              {" "}
              We will arrange for a reverse-pickup. The refund or replacement
              will only be processed upon receipt &amp; verification of the
              complete product with packaging &amp; accessories. The cost of any
              missing or damaged items (including the box) apart from those
              notified by you, will be debited from the advance payment done
              &amp; the remaining payment will be refunded. If a replacement is
              demanded, then the cost of any missing items need to be paid in
              advance, prior to the shipment of the replacement.
            </p>
          </div>
          <br />
          <h3>How do I return my package? Do I need to include anything?</h3>
          <div>
            <p>
              If the customer had purchased our products from other market
              places please contact them first , if the return window is still
              open
            </p>
            <ul>
              <li>Return must be made within 7 days from purchase date.</li>
              <li>
                The goods must not have been used, Protective films on products
                must be intact and must be complete with all components and the
                packaging must not be damaged. Note that if these conditions are
                not met we may not accept returned goods;
              </li>
              <li>
                Refunds are given for the complete cost of the product, minus
                any shipping charges, minus any missing items.
              </li>
              <li>
                Return /Exchange shipping cost should be borne completely by
                customer.
              </li>
            </ul>
            <p>
              If you have installed and believe that item is faulty, all
              problems need to be reported immediately for a refund /
              replacement or within warranty period for replacement.
              <br />
              If you would like to return or exchange an item, please
              email contact us to get return instructions. Any packages returned
              without our authorization are subject to being returned to sender.
              We recommend you use a tracking service for all returns.
              <br />
              The returned merchandise must be sent back in its original
              packaging and returned in the same condition as when sold to you,
              including all packaging, parts, accessories, manuals, and
              documentation. The returned item(s) must be repackaged properly so
              that it is not damaged during shipping.
              <br />
              For your protection we recommend that you use a tracked delivery
              service when returning your item back to us as we are not liable
              for any loss or damage while in transit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SitePageReturns;
