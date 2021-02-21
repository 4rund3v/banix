import React from "react";
import ReactDOM from "react-dom";
import BanixApp from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "typeface-roboto";
import "typeface-roboto/files/roboto-latin-300.woff2";
import "typeface-roboto/files/roboto-latin-400.woff2";
import "typeface-roboto/files/roboto-latin-500.woff2";
import "typeface-roboto/files/roboto-latin-700.woff2";

import "./scss/style.scss";
import { Provider } from "react-redux";
import store from "./store";
ReactDOM.render(
  <Provider store={store}>
    <BanixApp />
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
