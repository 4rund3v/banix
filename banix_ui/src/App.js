import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import ScrollToTop from "./components/misc/ScrollToTop";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PasswordReset from "./screens/PasswordReset";
import NotFoundScreen from "./screens/NotFoundScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import CustomerAccountScreen from "./screens/CustomerAccountScreen";
// site pages
import SitePageAboutUs from "./components/site/SitePageAboutUs";
import SitePageContactUs from "./components/site/SitePageContactUs";
import SitePageTerms from "./components/site/SitePageTerms";
import SitePageWarranty from "./components/site/sitePageWarranty";
import SitePageShipping from "./components/site/sitePageShipping";
import SitePageReturns from "./components/site/sitePageReturns";
import SitePagePrivacyPolicy from "./components/site/SitePagePrivacyPolicy";
import RegisterCompleteScreen from "./screens/RegisterCompleteScreen";

function BanixApp() {
    return (
        <Router>
            <ScrollToTop>
                <Header />
                <main>
                    <Container className="content my-2">
                        <Switch>
                            {/* Customer links*/}
                            <Route
                                path="/login"
                                component={LoginScreen}
                                exact
                            />
                            <Route
                                path="/register"
                                component={RegisterScreen}
                                exact
                            />
                            <Route
                                path="/register/complete"
                                component={RegisterCompleteScreen}
                                exact
                            />
                            <Route
                                path="/account"
                                component={CustomerAccountScreen}
                            />
                            <Route
                                path="/password-reset"
                                component={PasswordReset}
                            />
                            {/* Product Links */}
                            <Route
                                path="/product/:id"
                                component={ProductScreen}
                            />
                            <Route path="/cart/:id?" component={CartScreen} />
                            <Route
                                path="/shipping"
                                component={ShippingScreen}
                            />
                            <Route
                                path="/place-order"
                                component={PlaceOrderScreen}
                            />
                            <Route
                                path="/order-info/:id"
                                component={OrderScreen}
                            />
                            {/* site pages links */}
                            {/* Customer Service Related links*/}
                            <Route
                                path="/site/contact-us"
                                component={SitePageContactUs}
                            />
                            <Route
                                path="/site/warranty-refunds"
                                component={SitePageWarranty}
                            />
                            <Route
                                path="/site/returns"
                                component={SitePageReturns}
                            />
                            <Route
                                path="/site/shipping"
                                component={SitePageShipping}
                            />
                            {/* Information Related links*/}
                            <Route
                                path="/site/about-us"
                                component={SitePageAboutUs}
                            />
                            <Route
                                path="/site/terms"
                                component={SitePageTerms}
                            />

                            <Route
                                path="/site/privacy-policy"
                                component={SitePagePrivacyPolicy}
                            />
                            <Route
                                path="/site/terms"
                                component={SitePageTerms}
                            />

                            {/*  Default Routes*/}
                            <Route path="/" component={HomeScreen} exact />
                            <Route component={NotFoundScreen} />
                        </Switch>
                    </Container>
                </main>
                <Footer />
            </ScrollToTop>
        </Router>
    );
}

export default BanixApp;
