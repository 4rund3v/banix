// react
import React from "react";
// third-party
import { Helmet } from "react-helmet-async";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// application
import Footer from "./footer";
import Header from "./header";
import MobileHeader from "./mobile/MobileHeader";
import MobileMenu from "./mobile/MobileMenu";
import Quickview from "./shared/Quickview";
// account related
import AccountLayout from "./account/AccountLayout";
import AccountPageLogin from "./account/AccountPageLogin";
// store related
import PageCart from "./shop/ShopPageCart";
import PageCheckout from "./shop/ShopPageCheckout";
import PageCompare from "./shop/ShopPageCompare";
import PageWishlist from "./shop/ShopPageWishlist";
import ShopPageCategory from "./shop/ShopPageCategory";
import ShopPageOrderSuccess from "./shop/ShopPageOrderSuccess";
import ShopPageProduct from "./shop/ShopPageProduct";
import ShopPageTrackOrder from "./shop/ShopPageTrackOrder";
// site pages (static)
import SitePageAboutUs from "./site/SitePageAboutUs";
import SitePageContactUs from "./site/SitePageContactUs";
import SitePageContactUsAlt from "./site/SitePageContactUsAlt";
import SitePageFaq from "./site/SitePageFaq";
import SitePageNotFound from "./site/SitePageNotFound";
import SitePageTerms from "./site/SitePageTerms";

// data stubs
import theme from "../data/theme";

const Layout = (props) => {
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
            <Route
              exact
              path={`/`}
              render={(props) => (
                <ShopPageCategory
                  {...props}
                  columns={3}
                  viewMode="grid"
                  sidebarPosition="start"
                />
              )}
            />
            <Route
              exact
              path="/shop/catalog/:categorySlug"
              render={(props) => (
                <ShopPageCategory
                  {...props}
                  columns={3}
                  viewMode="grid"
                  sidebarPosition="start"
                  categorySlug={props.match.params.categorySlug}
                />
              )}
            />
            <Route
              exact
              path="/shop/products/:productSlug"
              render={(props) => (
                <ShopPageProduct
                  {...props}
                  layout="standard"
                  productSlug={props.match.params.productSlug}
                />
              )}
            />
            <Redirect exact from="/shop/catalog" to="/" />
            <Route exact path="/shop/cart" component={PageCart} />
            <Route exact path="/shop/checkout" component={PageCheckout} />
            <Route
              exact
              path="/shop/checkout/success"
              component={ShopPageOrderSuccess}
            />
            <Route exact path="/shop/wishlist" component={PageWishlist} />
            <Route exact path="/shop/compare" component={PageCompare} />
            <Route
              exact
              path="/shop/track-order"
              component={ShopPageTrackOrder}
            />

            {/*
                    // Account
                    */}
            <Route exact path="/account/login" component={AccountPageLogin} />
            <Route path="/account" component={AccountLayout} />

            {/*
                    // Site
                    */}
            <Redirect exact from="/site" to="/site/about-us" />
            <Route exact path="/site/about-us" component={SitePageAboutUs} />

            <Route
              exact
              path="/site/contact-us"
              component={SitePageContactUs}
            />
            <Route
              exact
              path="/site/contact-us-alt"
              component={SitePageContactUsAlt}
            />
            <Route exact path="/site/not-found" component={SitePageNotFound} />
            <Route exact path="/site/faq" component={SitePageFaq} />
            <Route exact path="/site/terms" component={SitePageTerms} />
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

export default Layout;
