import { IRoute } from "./../interfaces/rout";
import { appRouts } from "./appRouts";
import { authRouts } from "./authRouts";

const getLinks = (routs: Record<string, IRoute>) => Object.values(routs).map(({ link }) => link);

export const links: Record<string, string[]> = {
  appLinks: getLinks(appRouts),
  authLinks: getLinks(authRouts),
};
