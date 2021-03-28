// import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./compoenents/Header";
import SideBar from "./compoenents/SideBar";
import Footer from "./compoenents/Footer";

import CustomersPage from "./compoenents/pages/CustomersPage";
import DashboardPage from "./compoenents/pages/DashboardPage";
import MailPage from "./compoenents/pages/MailPage";
import OrdersPage from "./compoenents/pages/OrdersPage";
import SettingsPage from "./compoenents/pages/SettingsPage";

import "bootstrap/dist/css/bootstrap.css";
import "./App.scss";
import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <SideBar />
        <div className="main-content">
          <Header />
          <main>
            <Switch>
              <Route path="/customers" component={CustomersPage} exact />
              <Route path="/mail" component={MailPage} exact />
              <Route path="/orders" component={OrdersPage} exact />
              <Route path="/settings" component={SettingsPage} exact />
              <Route path="/dashboard" component={DashboardPage} exact />
              <Route path="/" component={DashboardPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
