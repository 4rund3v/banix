import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/misc/Header";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import Footer from "./components/misc/Footer";

function BanixApp() {
  return (
    <Router>
      <Header />
      <main>
        <Container className="content my-4">
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default BanixApp;
