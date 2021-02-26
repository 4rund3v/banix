import React from "react";
import { Helmet } from "react-helmet";
import { Container, Row, Card, Col } from "react-bootstrap";
import PageBreadcrumb from "../shared/PageBreadcrumb";

const SitePageTerms = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Terms and Conditions", url: "/site/terms" },
  ];
  return (
    <>
      <Helmet>
        <title>{`Terms and Conditions — Banix}`}</title>
      </Helmet>

      <PageBreadcrumb header="Terms and Conditions" breadcrumb={breadcrumb} />
      <div className="block">
        <Container className="container">
          <div className="terms__body">
            <div className="terms__text typography">
              <p>
                <span>
                  Please read these Terms before using the Site. By using the
                  Site, you hereby represent, warrant, understand, agree to and
                  accept these Terms in their entirety whether or not you
                  register as a purchaser on the Site (&quot;Users&quot;).
                </span>
                <span>
                  Banix site is owned and operated by Banix, registered in
                  Bangalore, India. These Terms of Use (the &quot;Terms&quot; or
                  &quot;Agreement&quot;) set forth the terms and conditions
                  under which individuals may use the websites www.banix.in
                  These Terms include the Company’s Privacy Policy, which is
                  incorporated herein. If you object to anything in these Terms
                  or the Privacy Policy do not access and/or use the Site.{" "}
                </span>
                By placing your order on banix.in you agree to the following
                terms and conditions: These Terms, including the Privacy Policy,
                are subject to change by Company at any time. We will notify you
                about significant changes in these Terms by sending a notice to
                the email address registered in your account, or by placing a
                prominent notice on our Site, so that you can choose whether to
                continue using our Site. Changes or clarifications will take
                effect immediately upon posting of the updated Terms on our
                Site. You should periodically check the Site for updates. Any
                use of the Site or the Products (as defined below) by you after
                the effective date of any changes will constitute your
                acceptance of such changes. If you need to contact us please
                email us using our online form care@banix.in Registered office:
                Banix Infant Mercy Mallappa Layout Seegehalli Bangalore, KA,
                IN,560049 Banix.in is completely dedicated to your total
                satisfaction. All of our terms and conditions have been put in
                place to protect the interests of our customers and to provide
                the best possible service to you all. Outlined below are all of
                our terms and conditions. If you want to buy from this site or
                use our web site you can only do so on these terms and
                conditions, and by using this web site you are agreeing to be
                bound by them. Although they are written in small print, they
                are designed to be fair to both parties.
              </p>{" "}
              {/* Accepted Methods of Payment For security details, please see our privacy
      statement. Shop with confidence at banix.in using our secure server. Once
      you&#39;ve decided what you want to buy, you can pay through gateway which
      accepts all major credit and debit cards. If you are ordering outside of
      India, please be aware that your credit card company may charge a currency
      conversion fee. There is no fee payable if you pay with our payment
      gateway. Please note that when ordering items, when paying with payment
      gateway, full payment is taken at the time of ordering. To cancel or amend
      an unshipped order please use our online form to contact us.   **Cash On
      Delivery (COD)**  COD convenience fee charges of 50/100/200 INR based on
      order value is charged by courier companies as COD collection fee. If you
      want to avoid these charges, please use prepaid mode of payment using
      credit/debit cards, net-banking or wallets like Paytm, Mobikwik
      etc. Please check the serviceability of COD pin codes on the cart page. If
      not serviceable, we reserve the right to cancel your order. The Max of
      5000 INR COD orders are allowed.   A Phone verification for all the COD
      orders has been mandatory at banix India, a auto call verification will be
      done through system once you place a COD order. If missed, a manual calls
      will be initiated.    Tax Charges VAT stands for value-added tax, which is
      charged on all goods and services within India. All our products include
      VAT in the displayed price. VAT invoice will be stored along with your
      order shipment.    Buying Products on Our Website All of our prices are
      inclusive of VAT. Delivery charges will be calculated during the checkout
      process, after you choose your preferred delivery method.  We may change
      the price of any product at any time before you place an order. If the
      goods you have ordered are not in stock, we may send an e-mail to inform
      you, at which time you may cancel your order. We do our best to accurately
      estimate when items will be dispatched and/or delivered; however, these
      estimates are based on several factors over which we have no control and
      as such, time for dispatch and/or delivery shall not be of the essence of
      the contract and should be considered as rough estimates only. *** Product
      image for illustration purposes only. Actual product color may vary
      slightly from the image due to monitor setting and brightness level of the
      screen.   Note: All transactions are subject to KARNATAKA State VAT.   
      Cancellation Policy You can cancel your orders that are not yet
      dispatched. Customer’s should inform banix.in by using our online contact
      form. If you request order cancellation post the dispatch of the shipment
      or Reject delivery of shipment. Two Ways shipping charges of up
      to 250-300 INR will be deducted from the refund.  Banix reserves the right
      to cancel the order in any circumstances, not limited to unavailability
      and non-serviceability of the order. You will be credited with a full
      refund within 5-7 working days from the date of cancellation of the order
      through original mode of payment.   Special Considerations All orders may
      be placed on hold for further security verification if billing and
      shipping information is different and order exceeds over 5000.   Discount
      Coupons and Offers Coupons can be used to avail additional discount on
      each purchase. Coupons are valid for only specific products. Multiple
      coupons are not allowed for single purchase order. COD (cash on delivery)
      orders will be not considered and auto cancelled with special discount
      coupons. Banix reserves the rights to modify or change any discount
      coupons or offers without any prior notice.   Your Content Submission for
      Custom Orders Banix has every right to reject any requests for customized
      orders if the content contains any offensive, threatening, obscene,
      pornographic, or profane material.   Modification of Terms These Terms may
      be amended by Banix at any time. Such amended Terms shall be effective
      upon posting. By continuing to access or use the Site after such posting,
      you will be deemed to have accepted such amendments. You are advised to
      regularly review any applicable terms and conditions. Company reserves the
      right to discontinue or make changes or updates with respect to the Site
      or the contents of the Site at any time without notice. Company reserves
      the right to restrict, refuse or terminate access of any person to the
      Site or any part thereof effective immediately without notice at any time
      and for any reason whatsoever at its sole discretion. */}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default SitePageTerms;
