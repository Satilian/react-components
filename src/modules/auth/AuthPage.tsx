import React from "react";
import { Route, Switch } from "react-router-dom";
import { authRouts } from "../../routs/authRouts";

export const AuthPage = () => (
  <div className="container">
    <Switch>
      {Object.values(authRouts).map(({ link, Component }) => (
        <Route key={link} path={link} component={Component} />
      ))}
    </Switch>
  </div>
);
