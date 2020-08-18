import React, { FC } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { authRouts } from "../routs/authRouts";
import { isAuth } from "../utils/isAuth";

export const PrivateRoute: FC<RouteProps> = (props) =>
  isAuth() ? <Route {...props} /> : <Redirect to={authRouts.signin.link} />;
