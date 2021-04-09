import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import SitePageAboutUs from "../site/SitePageAboutUs";
import SitePageContactUs from "../site/SitePageContactUs";
import SitePageContactUsAlt from "../site/SitePageContactUsAlt";
import SitePageFaq from "../site/SitePageFaq";
import SitePageTerms from "../site/SitePageTerms";
import SitePageNotFound from "../site/SitePageNotFound";

const SiteLayout = () => {
  console.log("[SiteLayout] Being Rendered");
  return (
    <Switch>
      <Redirect exact from="/site" to="/site/about-us" />
      <Route exact path="/site/about-us" component={SitePageAboutUs} />
      <Route exact path="/site/contact-us" component={SitePageContactUs} />
      <Route
        exact
        path="/site/contact-us-alt"
        component={SitePageContactUsAlt}
      />
      <Route exact path="/site/not-found" component={SitePageNotFound} />
      <Route exact path="/site/faq" component={SitePageFaq} />
      <Route exact path="/site/terms" component={SitePageTerms} />
    </Switch>
  );
};

export default SiteLayout;
