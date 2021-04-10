import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AuthPageLogin from "../auth/AuthPageLogin";
import AuthPageRegister from "../auth/AuthPageRegister";
import AuthPageRegisterComplete from "../auth/AuthPageRegisterComplete";
import SitePageNotFound from "../site/SitePageNotFound";

const AuthLayout = () => {
  return (
    <Switch>
      <Route path="/auth/login" component={AuthPageLogin} />
      <Route
        path="/auth/register/complete"
        component={AuthPageRegisterComplete}
        exact
      />
      <Route path="/auth/register" component={AuthPageRegister} />

      <Route component={SitePageNotFound} />
    </Switch>
  );
};

export default AuthLayout;
