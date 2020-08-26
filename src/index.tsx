import { Layout } from "components/Layout";
import { DemoPage } from "modules/demo/DemoPage";
import React, { Suspense } from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { appRouts } from "routs/appRouts";
import { configureStore } from "store";
import "styles/style.scss";
import { PrivateRoute } from "./components/PrivateRoute";
import { AdminPage } from "./modules/admin/AdminPage";
import { AuthPage } from "./modules/auth/AuthPage";
import { HomePage } from "./modules/home/HomePage";
import { links } from "./routs/links";

const { persistor, store } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path={appRouts.home.link} component={HomePage} />

              <Route path={links.demoLinks} component={DemoPage} />

              <Route path={links.authLinks} component={AuthPage} />

              <PrivateRoute path={links.adminLinks} component={AdminPage} />

              <Redirect to={appRouts.home.link} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
