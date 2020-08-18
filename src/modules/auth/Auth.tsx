import React, { FC } from "react";
import { Route, Switch } from "react-router-dom";
import { authRouts } from "../../routs/authRouts";
import { SignIn } from "./components/SingIn";
import styled from "astroturf";
import { SignUp } from "./components/SignUp";

export const Auth: FC = () => {
  return (
    <Container>
      <Switch>
        <Route path={authRouts.signin.link} component={SignIn} />
        <Route path={authRouts.signup.link} component={SignUp} />
      </Switch>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
`;
