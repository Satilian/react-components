import React from "react";
import { Route, Switch } from "react-router-dom";
import { demoRouts } from "routs/demoRouts";

export const DemoPage = () => (
  <Switch>
    {Object.values(demoRouts).map(({ link, Component }) => (
      <Route key={link} path={link} component={Component} />
    ))}
  </Switch>
);
