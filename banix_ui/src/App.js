import Header from "./components/Header";
import ProductsHome from "./components/ProductsHome";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import OffersBanner from "./components/OffersBanner";
import { Container, Row } from "react-bootstrap";

function BanixApp() {
  return (
    <div className="BanixApp">
      <Header />
      <Container>
        <OffersBanner />
        {/* <ProductsHome /> */}
      </Container>
    </div>
  );
}

export default BanixApp;
