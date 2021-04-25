// react
import React from "react";

// application
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import ToTop from "./ToTop";

export default function Footer() {
  const customerLinks = [
    { title: "Terms and Conditions", url: "/site/terms" },
    { title: "About Us", url: "/site/about-us" },
    { title: "FAQ", url: "/site/faq" },
    { title: "Contact Us", url: "/site/contact-us" },
    { title: "Careers", url: "/site/careers" },
  ];
  const informationLinks = [
    { title: "Shipping", url: "/site/shipping" },
    { title: "Returns", url: "/site/returns" },
    { title: "Privacy Policy", url: "/site/privacy-policy" },
    { title: "Refund Policy", url: "/site/refund-policy" },
    { title: "Warranty", url: "/site/warranty" },
  ];

  return (
    <div className="site-footer">
      <div className="container">
        <div className="site-footer__widgets">
          <div className="row">
            <div className="col-12 col-md-6 col-lg-4">
              <FooterContacts />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="Customer Service" items={customerLinks} />
            </div>
            <div className="col-6 col-md-3 col-lg-2">
              <FooterLinks title="Information" items={informationLinks} />
            </div>
            <div className="col-12 col-md-12 col-lg-4">
              <FooterNewsletter />
            </div>
          </div>
        </div>
      </div>
      <ToTop />
    </div>
  );
}
