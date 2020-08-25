import React from "react";
import { Route, Switch } from "react-router-dom";
import { appRouts } from "../../routs/appRouts";
import { Dashboard } from "./components/Dashboard";

export const App = () => (
  <Switch>
    <Route exact path={appRouts.home.link} component={Dashboard} />
  </Switch>
);
