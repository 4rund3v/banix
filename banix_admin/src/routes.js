import React from "react";
import ForgotPassword from "./screens/ForgotPassword";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Logout from "./screens/Logout";

const adminRoutes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/logout",
    component: Logout,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/",
    component: Home,
  },
];
export default adminRoutes;
