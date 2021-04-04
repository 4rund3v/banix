// react
import React, { useEffect } from "react";
import "./components/FontAwesomeIcons";

// third-party
import PropTypes from "prop-types";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ScrollContext } from "react-router-scroll-4";

// application

// pages
import Layout from "./components/Layout";
import HomePageOne from "./components/home/HomePageOne";

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      const preloader = document.querySelector(".site-preloader");
      preloader.addEventListener("transitionend", (event) => {
        if (event.propertyName === "opacity") {
          preloader.parentNode.removeChild(preloader);
        }
      });
      preloader.classList.add("site-preloader__fade");
    }, 500);
  }, []);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <HelmetProvider>
        <Helmet />
        <Switch>
          <Route
            path="/"
            render={(props) => (
              <Layout
                {...props}
                headerLayout="default"
                homeComponent={HomePageOne}
              />
            )}
          />
          <Redirect to="/" />
        </Switch>
      </HelmetProvider>
    </BrowserRouter>
  );
};

export default App;
