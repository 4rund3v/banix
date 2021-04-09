import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SitePageAboutUs from "../site/SitePageAboutUs";
import SitePageContactUs from "../site/SitePageContactUs";
import SitePageFaq from "../site/SitePageFaq";
import SitePageTerms from "../site/SitePageTerms";
import SitePageNotFound from "../site/SitePageNotFound";
import SitePageCareers from "../site/SitePageCareers";
import SitePageReturns from "../site/SitePageReturns";
import SitePageShipping from "../site/SitePageShipping";
import SitePagePrivacyPolicy from "../site/SitePagePrivacyPolicy";
import SitePageRefundPolicy from "../site/SitePageRefundPolicy";
import SitePageWarranty from "../site/SitePageWarranty";

const SiteLayout = () => {
  console.log("[SiteLayout] Being Rendered");
  return (
    <Switch>
      {/* Customer Service Block */}
      <Redirect exact from="/site" to="/site/about-us" />
      <Route exact path="/site/terms" component={SitePageTerms} />
      <Route exact path="/site/about-us" component={SitePageAboutUs} />
      <Route exact path="/site/faq" component={SitePageFaq} />
      <Route exact path="/site/contact-us" component={SitePageContactUs} />
      <Route exact path="/site/careers" component={SitePageCareers} />
      {/* Information block */}
      <Route exact path="/site/shipping" component={SitePageShipping} />
      <Route exact path="/site/returns" component={SitePageReturns} />
      <Route
        exact
        path="/site/privacy-policy"
        component={SitePagePrivacyPolicy}
      />
      <Route
        exact
        path="/site/refund-policy"
        component={SitePageRefundPolicy}
      />
      <Route exact path="/site/warranty" component={SitePageWarranty} />

      <Route exact path="/site/not-found" component={SitePageNotFound} />
      <Route component={SitePageNotFound} />
    </Switch>
  );
};

export default SiteLayout;
