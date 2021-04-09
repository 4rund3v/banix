// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageFaq() {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Frequently Asked Questions", url: "/site/faq" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`FAQ — ${theme.name}`}</title>
      </Helmet>

      <PageHeader header="Frequently Asked Questions" breadcrumb={breadcrumb} />

      <div className="block faq">
        <div className="container">
          <div className="faq__section">
            <div className="faq__section-title">
              <h3>Frequently Asked Questions</h3>
            </div>
            <div className="faq__section-body">
              <div className="row">
                <div className="faq__section-column col-12">
                  <div className="typography">
                    <h3>What is Banix warranty policy?</h3>
                    <p>
                      We are responsible for our product conditions. We would
                      love to help you resolve any issues. We want you to have a
                      positive experience every time you shop with Banix. Please
                      let us know if you have received any defected item by
                      contacting us.
                      <br />
                      This policy is only valid for naturally defected item as
                      that counts as a production error. The warranty does not
                      cover Normal wear and tear, defects caused by owner&#39;s
                      usage like accidental drops, failure of installation,
                      carelessness by the user, mishandled, altered, modifies or
                      misused.
                      <br />
                      Items must be requested to be warranted within the
                      mentioned days and the purchase date to be considered for
                      a defect review, otherwise it will not be eligible for any
                      warranties.
                      <br />
                      There are some requirements for Warranty:
                      <ul>
                        <li>Close-up photo of defected item, defected area</li>
                        <li>Full name used on purchase</li>
                        <li>Order # with full name of the product purchased</li>
                        <li>Shipping Address</li>
                      </ul>
                      After it is approved for defect review, we require the
                      item to be returned back to us for an exchange. Returns
                      might not be accepted due to non-compatibility of our
                      products with other branded accessories. Banix will not
                      hold any responsibility about the same.
                      <br />
                      All Banix products comes with a 6 Months
                      Limited Warranty against manufacturing defects only.
                      *Terms &amp; Conditions apply*
                      <br />
                      Defects are defined as imperfections or flaws that are
                      produced by a manufacturing error or defects in material
                      or workmanship, only for a period of six months from the
                      original date of purchase of the product.  Banix will
                      either replace the defective product, repair it so it is
                      returned to its original specifications or replace it with
                      a product of same or higher value, if the original product
                      is discontinued.
                      <br />
                      <em>
                        The warranty is applicable for the orders which are
                        purchased only via Banix site and other marketplace with
                        seller name as Banix.
                      </em>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageFaq;
