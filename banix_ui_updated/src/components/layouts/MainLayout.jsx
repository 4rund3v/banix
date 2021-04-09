// react
import React from "react";
// third-party
import { Helmet } from "react-helmet-async";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// application
import Footer from "../footer";
import Header from "../header";
import MobileHeader from "../mobile/MobileHeader";
import MobileMenu from "../mobile/MobileMenu";
import Quickview from "../shared/Quickview";
// account related

import SiteLayout from "./SiteLayout";
import ShopLayout from "./ShopLayout";
import AuthLayout from "./AuthLayout";
import AccountLayout from "./AccountLayout";

import SitePageNotFound from "../site/SitePageNotFound";

// site pages (static)

// data stubs
import theme from "../../data/theme";

const MainLayout = (props) => {
  const { match, headerLayout } = props;
  return (
    <React.Fragment>
      <Helmet>
        <title>{theme.name}</title>
        <meta name="description" content={theme.fullName} />
      </Helmet>
      <ToastContainer autoClose={5000} hideProgressBar />
      <Quickview />
      <MobileMenu />
      <div className="site">
        <header className="site__header d-lg-none">
          <MobileHeader />
        </header>
        <header className="site__header d-lg-block d-none">
          <Header layout={headerLayout} />
        </header>
        <div className="site__body">
          <Switch>
            {/*  // Account  */}
            <Route path="/auth" component={AuthLayout} />
            <Route path="/account" component={AccountLayout} />
            {/*  // Site  */}
            <Route path="/site" component={SiteLayout} />
            {/* Home Page */}
            <Route path="/" component={ShopLayout} />
            <Route component={SitePageNotFound} />
          </Switch>
        </div>
        <footer className="site__footer">
          <Footer />
        </footer>
      </div>
    </React.Fragment>
  );
};

export default MainLayout;
