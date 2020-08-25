import styled from "astroturf";
import { IRoute } from "interfaces/rout";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { componentsRouts } from "routs/componentsRouts";
import { appRouts } from "routs/appRouts";

export const Layout: FC = ({ children }) => {
  return (
    <Container>
      <Menu>
        <li>
          <Link to={appRouts.home.link}>Home page</Link>
        </li>
        {Object.values(componentsRouts).map(({ link, title }: IRoute) => (
          <li key={link}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
      </Menu>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const Content = styled.div`
  padding: 100px 0 0;
  overflow: auto;
  flex: 1 0;
`;

const Menu = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
`;
