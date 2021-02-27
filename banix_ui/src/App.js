import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Header from "./components/misc/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/misc/Footer";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PasswordReset from "./screens/PasswordReset";
import About from "./screens/About";
import NotFoundScreen from "./screens/NotFoundScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import SitePageAboutUs from "./components/site/SitePageAboutUs";
import SitePageContactUs from "./components/site/SitePageContactUs";
import SitePageTerms from "./components/site/SitePageTerms";
import SitePagePrivacyPolicy from "./components/site/SitePagePrivacyPolicy";

function BanixApp() {
  return (
    <Router>
      <ScrollToTop>
        <Header />
        <main>
          <Container className="content my-2">
            <Switch>
              {/* Customer links*/}
              <Route path="/login" component={LoginScreen} exact />
              <Route path="/register" component={RegisterScreen} exact />
              <Route path="/profile" component={ProfileScreen} exact />
              <Route path="/password-reset" component={PasswordReset} />
              {/* Product Links */}
              <Route path="/product/:id" component={ProductScreen} />
              <Route path="/cart/:id?" component={CartScreen} />
              <Route path="/shipping" component={ShippingScreen} />
              <Route path="/payment" component={PaymentScreen} />
              <Route path="/place-order" component={PlaceOrderScreen} />
              {/* site pages links */}
              {/* Customer Service Related links*/}
              <Route path="/site/order-tracking" component={About} />
              <Route path="/site/returns" component={About} />
              <Route path="/site/refunds" component={About} />
              <Route path="/site/shipping" component={About} />
              {/* Information Related links*/}
              <Route path="/site/about-us" component={SitePageAboutUs} />
              <Route path="/site/contact-us" component={SitePageContactUs} />
              <Route path="/site/terms" component={SitePageTerms} />
              <Route
                path="/site/privacy-policy"
                component={SitePagePrivacyPolicy}
              />
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
