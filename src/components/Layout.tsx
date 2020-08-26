import styled from "astroturf";
import { IRoute } from "interfaces/rout";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { demoRouts } from "routs/demoRouts";
import { appRouts } from "routs/appRouts";
import { authRouts } from "routs/authRouts";
import { adminRouts } from "routs/adminRouts";

export const Layout: FC = ({ children }) => {
  return (
    <>
      <Menu>
        {Object.values(appRouts).map(({ link, title }: IRoute) => (
          <li key={link}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
        <br />
        {Object.values(demoRouts).map(({ link, title }: IRoute) => (
          <li key={link}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
        <br />
        {Object.values(authRouts).map(({ link, title }: IRoute) => (
          <li key={link}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
        <br />
        {Object.values(adminRouts).map(({ link, title }: IRoute) => (
          <li key={link}>
            <Link to={link}>{title}</Link>
          </li>
        ))}
        <br />
      </Menu>
      <Content>{children}</Content>
    </>
  );
};

const Menu = styled.ul`
  overflow-x: hidden;
  overflow-y: auto;
  padding: 50px 20px;
  list-style-type: none;
  width: 200px;
  a {
    text-decoration: none;
    color: cadetblue;
  }
`;

const Content = styled.div`
  display: flex;
  padding: 50px 20px;
  overflow: auto;
  flex: 1 0;
`;
