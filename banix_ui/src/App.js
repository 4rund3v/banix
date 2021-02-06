import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
import Default from "./screens/Default";
import ShippingScreen from "./screens/ShippingScreen";

function BanixApp() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="content my-2">
          <Switch>
            <Route path="/login" component={LoginScreen} exact />
            <Route path="/register" component={RegisterScreen} exact />
            <Route path="/profile" component={ProfileScreen} exact />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/password-reset" component={PasswordReset} />
            <Route path="/about" component={About} />
            <Route path="/" component={HomeScreen} exact />
            <Route component={Default} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default BanixApp;
