import "styles/style.scss";
import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { authRouts } from "./routs/authRouts";
import { links } from "./routs/links";
import { App } from "./modules/app/App";
import { Auth } from "./modules/auth/Auth";
import { configureStore } from "store";
import { PrivateRoute } from "./components/PrivateRoute";
import { HomePage } from "./modules/homePage/HomePage";

const { persistor, store } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Switch>
            <Route path="/" component={HomePage} />
            <Route exact path={links.authLinks} component={Auth} />
            <PrivateRoute exact path={links.appLinks} component={App} />
            <Redirect to={authRouts.signin.link} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
