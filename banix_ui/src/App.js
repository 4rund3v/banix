import Header from "./components/Header";
import ProductsHome from "./components/ProductsHome";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import OffersBanner from "./components/OffersBanner";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";

function BanixApp() {
  return (
    <div className="BanixApp">
      <Header />
      <main className="py-3">
        <Container>
          <OffersBanner />
          {/* <ProductsHome /> */}
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default BanixApp;
