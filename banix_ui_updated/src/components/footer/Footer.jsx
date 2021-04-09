// react
import React from "react";

// application
import FooterContacts from "./FooterContacts";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";
import ToTop from "./ToTop";

// data stubs
import theme from "../../data/theme";

export default function Footer() {
  const customerLinks = [
    { title: "Terms and Conditions", url: "" },
    { title: "About Us", url: "" },
    { title: "FAQ", url: "" },
    { title: "Contact Us", url: "" },
    { title: "Careers", url: "" },
  ];
  const informationLinks = [
    { title: "Shipping", url: "" },
    { title: "Returns", url: "" },
    { title: "Privacy Policy", url: "" },
    { title: "Refund Policy", url: "" },
    { title: "Warranty", url: "" },
  ];

  const accountLinks = [{ title: "To be created", url: "" }];

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
