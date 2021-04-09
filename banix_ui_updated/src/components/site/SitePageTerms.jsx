// react
import React from "react";

// third-party
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

// application
import PageHeader from "../shared/PageHeader";

// data stubs
import theme from "../../data/theme";

function SitePageTerms() {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Terms And Conditions", url: "/site/terms" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Terms And Conditions — ${theme.name}`}</title>
      </Helmet>

      <PageHeader breadcrumb={breadcrumb} />

      <div className="block">
        <div className="container">
          <div className="document">
            <div className="document__header">
              <h1 className="document__title">Terms And Conditions</h1>
              <div className="document__subtitle">
                This Agreement was last modified on 26 March 2021.
              </div>
            </div>
            <div className="document__content typography">
              <p>
                <span>
                  <i>Please read these Terms before using the Site.</i> By using
                  the Site, you hereby represent, warrant, understand, agree to
                  and accept these Terms in their entirety whether or not you
                  register as a purchaser on the Site (&quot;Users&quot;).
                </span>
                <br />
                <span>
                  <strong>Banix</strong> site is owned and operated by Banix,
                  registered in Bangalore, India. These Terms of Use (the
                  &quot;Terms&quot; or &quot;Agreement&quot;) set forth the
                  terms and conditions under which individuals may use the
                  websites 
                  <strong>www.banix.in</strong> These Terms include the
                  Company’s Privacy Policy, which is incorporated herein. If you
                  object to anything in these Terms or the Privacy Policy do not
                  access and/or use the Site.
                </span>
                <br />
                <span>
                  These Terms, including the Privacy Policy, are subject to
                  change by Company at any time. We will notify you about
                  significant changes in these Terms by sending a notice to the
                  email address registered in your account, or by placing a
                  prominent notice on our Site, so that you can choose whether
                  to continue using our Site. Changes or clarifications will
                  take effect immediately upon posting of the updated Terms on
                  our Site.
                </span>
                <br />
                <span>
                  You should periodically check the Site for updates. Any use of
                  the Site or the Products (as defined below) by you after the
                  effective date of any changes will constitute your acceptance
                  of such changes.
                  <br />
                  If you need to contact us please email us using our online
                  form <a href="mailto:care@banix.in">care@banix.in</a>.
                  <address>
                    Registered office:
                    <br />
                    Banix Infant Mercy Mallappa Layout,
                    <br />
                    Seegehalli Bangalore, KA, IN,560049 Banix.in
                    <br />
                  </address>
                </span>
                <span>
                  All of our terms and conditions have been put in place to
                  protect the interests of our customers and to provide the best
                  possible service to you all. Outlined below are all of our
                  terms and conditions. If you want to buy from this site or use
                  our web site you can only do so on these terms and conditions,
                  and by using this web site you are agreeing to be bound by
                  them. Although they are written in small print, they are
                  designed to be fair to both parties.
                </span>
              </p>
              <p>
                By placing your order on banix.in you agree to the following
                terms and conditions:
              </p>
              <h2>Accepted Methods of Payment</h2>
              <span>
                For security details, please see our privacy statement.
              </span>
              <ul>
                <li>
                  Shop with confidence at banix.in using our secure server. Once
                  you&#39;ve decided what you want to buy, you can pay through
                  gateway which accepts all major credit and debit cards.
                </li>
                <li>
                  If you are ordering outside of India, please be aware that
                  your credit card company may charge a currency conversion fee.
                </li>
                <li>
                  There is no fee payable if you pay with our payment gateway.
                  Please note that when ordering items, when paying with payment
                  gateway, full payment is taken at the time of ordering. To
                  cancel or amend an unshipped order please use our online form
                  to contact us.
                </li>
              </ul>

              <h2>Cash On Delivery (COD)</h2>
              <ul>
                <li>
                    COD convenience fee charges of 50/100/200 INR based on order
                  value is charged by courier companies as COD collection fee.
                  If you want to avoid these charges, please use prepaid mode of
                  payment using credit/debit cards, net-banking or wallets like
                  Paytm, Mobikwik etc.
                </li>
                <li>
                  Please check the serviceability of COD pin codes on the cart
                  page. If not serviceable, we reserve the right to cancel your
                  order. The Max of 5000 INR COD orders are allowed.{" "}
                </li>
                <li>
                  A Phone verification for all the COD orders has been mandatory
                  at banix India, a auto call verification will be done through
                  system once you place a COD order. If missed, a manual calls
                  will be initiated. If you are ordering outside of India,
                  please be aware that your credit card company may charge a
                  currency conversion fee.
                </li>
              </ul>
              <h2>Tax Charges</h2>
              <ul>
                <li>
                  <strong>VAT</strong> stands for value-added tax, which is
                  charged on all goods and services within India. All our
                  products include VAT in the displayed price. VAT invoice will
                  be stored along with your order shipment.    
                </li>
                <li>
                  All of our prices are inclusive of VAT. Delivery charges will
                  be calculated during the checkout process, after you choose
                  your preferred delivery method.  We may change the price of
                  any product at any time before you place an order. If the
                  goods you have ordered are not in stock, we may send an e-mail
                  to inform you, at which time you may cancel your order. We do
                  our best to accurately estimate when items will be dispatched
                  and/or delivered; however, these estimates are based on
                  several factors over which we have no control and as such,
                  time for dispatch and/or delivery shall not be of the essence
                  of the contract and should be considered as rough estimates
                  only.
                  <strong>
                    Note: All transactions are subject to KARNATAKA State VAT.
                  </strong>
                </li>
              </ul>
              <h2>Policy</h2>
              <ul>
                <li>
                  <i>Product image for illustration purposes only.</i> Actual
                  product color may vary slightly from the image due to monitor
                  setting and brightness level of the screen.  
                </li>
                <li>
                  <strong>Cancellation Policy</strong> : You can cancel your
                  orders that are not yet dispatched. Customer’s should inform
                  <strong> banix.in</strong> by using our online contact form.
                  If you request order cancellation post the dispatch of the
                  shipment or Reject delivery of shipment. Two Ways shipping
                  charges of up to 250-300 INR(or calculated based on the
                  location) will be deducted from the refund.
                </li>
                <li>
                  Banix reserves the right to cancel the order in any
                  circumstances, not limited to unavailability and
                  non-serviceability of the order. You will be credited with a
                  full refund within 5-7 working days from the date of
                  cancellation of the order through original mode of payment.  
                </li>
              </ul>
              <h2>Special Considerations</h2>
              <ul>
                <li>
                  All orders may be placed on hold for further security
                  verification if billing and shipping information is different
                  and order exceeds over 5000.
                </li>
              </ul>
              <h2>Discount Coupons and Offers</h2>
              <p>
                Coupons can be used to avail additional discount on each
                purchase. Coupons are valid for only specific products. Multiple
                coupons are not allowed for single purchase order. COD (cash on
                delivery) orders will be not considered and auto cancelled with
                special discount coupons. Banix reserves the rights to modify or
                change any discount coupons or offers without any prior notice.
              </p>
              <h2>Your Content Submission for Custom Orders</h2>
              <p>
                Banix has every right to reject any requests for customized
                orders if the content contains any offensive, threatening,
                obscene, pornographic, or profane material.
              </p>
              <h2>Modification of Terms</h2>
              <p>
                These Terms may be amended by Banix at any time. Such amended
                Terms shall be effective upon posting. By continuing to access
                or use the Site after such posting, you will be deemed to have
                accepted such amendments.
                <br />
                You are advised to regularly review any applicable terms and
                conditions. Company reserves the right to discontinue or make
                changes or updates with respect to the Site or the contents of
                the Site at any time without notice.
                <br />
                Company reserves the right to restrict, refuse or terminate
                access of any person to the Site or any part thereof effective
                immediately without notice at any time and for any reason
                whatsoever at its sole discretion.
              </p>
              <p>
                For information about how to contact us, please visit our
                <Link to="/site/contact-us"> contact page</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default SitePageTerms;
