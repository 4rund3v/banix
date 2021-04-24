// react
import React, { useEffect } from "react";
import "./components/FontAwesomeIcons";
// third-party
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
// pages
import MainLayout from "./components/layouts/MainLayout";
import ScrollToTop from "./components/shared/ScrollToTop";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      const preloader = document.querySelector(".site-preloader");
      if (preloader && preloader.addEventListener) {
        preloader.addEventListener("transitionend", (event) => {
          if (event.propertyName === "opacity") {
            preloader.parentNode.removeChild(preloader);
          }
        });
        preloader.classList.add("site-preloader__fade");
      }
    }, 500);
  }, []);
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ScrollToTop>
        <HelmetProvider>
          <Helmet />
          <Switch>
            {/* <Route
              path="/"
              render={(props) => (
                <MainLayout {...props} headerLayout="default" />
              )}
            /> */}
            <Route path="/" component={MainLayout} />
            <Redirect to="/" />
          </Switch>
        </HelmetProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};

export default App;
