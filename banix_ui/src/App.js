import { Container } from "react-bootstrap";
import "./components/FontAwesomeIcons";

import Header from "./components/Header";

import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";

function BanixApp() {
  return (
    <div className="BanixApp">
      <Header />
      <main className="py-3">
        <Container>
          {/* <OffersBanner />
          <ProductsHome /> */}
          <HomeScreen />
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default BanixApp;
