import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";
import { BrowserRouter as Router, Route } from "react-router-dom";

import ProductScreen from "./screens/ProductScreen";
import Header from "./components/misc/Header";
import HomeScreen from "./screens/HomeScreen";
import Footer from "./components/misc/Footer";
function BanixApp() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/" component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default BanixApp;
