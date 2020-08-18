import styled from "astroturf";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { authRouts } from "../../../routs/authRouts";

export const Dashboard: FC = () => {
  return (
    <Container>
      <div>
        <Link to={authRouts.signin.link}>signin</Link>
      </div>
      <div>Dashboard item</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
`;
