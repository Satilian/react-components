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
import { appRouts } from "routs/appRouts";
import { CropperPage } from "modules/cropper/CropperPage";
import { TreeSelectPage } from "modules/treeSelect/TreeSelectPage";
import { componentsRouts } from "routs/componentsRouts";
import { Layout } from "components/Layout";
import { ToolTipPage } from "modules/toolTip/ToolTipPage";

const { persistor, store } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={null}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route exact path={appRouts.home.link} component={HomePage} />

              <Route path={componentsRouts.cropper.link} component={CropperPage} />
              <Route path={componentsRouts.treeSelect.link} component={TreeSelectPage} />
              <Route path={componentsRouts.toolTip.link} component={ToolTipPage} />

              <Route path={links.authLinks} component={Auth} />
              <PrivateRoute path={links.appLinks} component={App} />
              <Redirect to={authRouts.signin.link} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
