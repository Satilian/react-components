import { adminRouts } from "routs/adminRouts";
import { demoRouts } from "./demoRouts";
import { IRoute } from "./../interfaces/rout";
import { appRouts } from "./appRouts";
import { authRouts } from "./authRouts";

const getLinks = (routs: Record<string, IRoute>) => Object.values(routs).map(({ link }) => link);

export const links: Record<string, string[]> = {
  appLinks: getLinks(appRouts),
  adminLinks: getLinks(adminRouts),
  authLinks: getLinks(authRouts),
  demoLinks: getLinks(demoRouts),
};
