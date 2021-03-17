import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import adminRoutes from "./routes";

const App = () => {
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {adminRoutes.map((route, idx) => (
            <Route id={idx} path={route.path} component={route.component} />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default App;
