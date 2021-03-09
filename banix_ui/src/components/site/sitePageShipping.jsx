import React from "react";
import { Helmet } from "react-helmet";
import PageBreadcrumb from "../shared/PageBreadcrumb";

const SitePageShipping = () => {
  const breadcrumb = [
    { title: "Home", url: "/" },
    { title: "Shipping", url: "/site/shipping" },
  ];
  return (
    <div>
      <Helmet>
        <title>{`Shipping — Banix`}</title>
      </Helmet>
      <PageBreadcrumb breadcrumb={breadcrumb} />
      <div className="document">
        <div className="document__header">
          <h2 className="document__title">Shipping</h2>
          <div className="document__subtitle">
            This Agreement was last modified on 26 Feb 2021.
          </div>
        </div>
        <div className="document__content typography">
          <p>
            We understand that everyone who orders from us is eager to receive
            their products as soon as possible and we do our best to make this
            happen. We offer PAN India shipping on all orders placed on
            www.Banix.in.
          </p>
          <h3>Why hasn&#39;t my package arrived yet? </h3>
          <p>
            Our Courier usually delivers within 3-5 working days to tier 1
            cities, but sometimes may take up to 5-7 working days to tier 2
            areas. This does not include weekends or holidays. India Post
            Priority service usually delivers within 4-6 working days to tier 1
            cities, but sometimes may take up to 7-10 working days to tier 2 and
            up to 14 days to tier 3 areas. This does not include weekends or
            holidays.{" "}
          </p>
          <h3>What is your policy on lost or delayed packages? </h3>
          <p>
            Please make sure to double check the shipping addresses to ensure
            the delivery. If item returns to us due to incorrect shipping
            information, we will notify our customer known it is been returned
            by the post office, and automatically give customer refund for the
            purchase; however the Shipping and handling Charge is
            non-refundable. If Item (Prepaid Order) doesn&#39;t deliver within
            14 working days post dispatch date, an auto refund will be applied
            considering the item lost in transit through courier company. If
            Item (Cash on Delivery order) doesn&#39;t deliver within 7 working
            days post dispatch date for Tier 1 cities and within 10 working days
            post dispatch date for Tier 2 cities, Customer will have the rights
            to cancel / reject the order/shipment and same will be returned back
            us. We do not guarantee the delivery time; delivery issue is upon
            the shipping company, FedEx , Bluedart, Ecom Xpress etc (or the Post
            Office of the country). . We will try our best to ship out the
            purchased item within 1 or 2 Business days. Our office is closed on
            weekends and holidays. Orders placed on weekends and holidays will
            be processed the next business day. Additionally, orders placed
            after 10:00 am India Standard Time will be considered placed on the
            next business day. Shipping Policy Please make sure to double check
            the shipping addresses to ensure the delivery. If item returns to us
            due to incorrect shipping information, we will notify our customer
            that order has been returned and why it was been returned, and
            automatically give customer refund for the purchase, minus any
            shipping charges. All in-stock items will ship within 1-2 business
            days (This policy is applicable to all shipping methods). Any orders
            that are placed after 10:00 AM will be processed the following
            business day. When paying with our payment gateway, your order will
            not ship till eCheck clears the payment. We do not ship partial
            orders; your order will be packaged for shipment when all items are
            ready for shipment. 
          </p>{" "}
          <h3>Delivery Terms</h3>
          <p>
            All orders received after our 12pm deadline will be processed on the
            following working day. Working days are Monday to Saturday; we do
            not process orders on weekends or on holidays. For example, place
            your order after our 10 am deadline on Saturday and your order will
            be processed by us on the following Monday. Delivery days exclude
            weekends and holidays. 
          </p>{" "}
          <h3>**Cash on Delivery (COD)**</h3>
          <p>
            COD convenience fee charges based on order value is charged by
            courier companies as COD collection fee. If you want to avoid these
            charges, please use prepaid mode of payment using credit/debit
            cards, net-banking or wallets like Paytm, Mobikwik etc. Please check
            the serviceability of COD pin codes on the cart page. If not
            serviceable, we reserve the right to cancel your order. Phone
            verification is mandatory for all the COD (Cash on Delivery) orders.
             A Phone verification for all the COD orders has been mandatory at
            Banix, a auto call verification will be done through system once you
            place a COD order. If missed, a manual call will be initiated. 
          </p>{" "}
          <h3>Where is my order?</h3>{" "}
          <p>
            After you have placed your order online, we will send you an order
            confirmation email with the subject line ‘banix.in order
            confirmation&#39;. In the body of this email you will find
            information about when your products will be delivered. If you
            haven&#39;t received this email within 48 hours of placing your
            order or your products have not been delivered within the timescale
            stated in the email, then please send our Customer Service team by
            using our online form between 10 am and 6 pm Monday - Saturday. 
          </p>
          <h3>Delayed/Lost Delivery</h3>
          <p>
            If you have not received your order within 15 working days of
            dispatch (not including Sundays &amp; holidays), you must
            immediately advise Banix Customer Services of the delay/loss. In the
            event of a replacement order being sent to you, all replacement
            item’s will be sent to you followed by confirmation of non-delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SitePageShipping;
