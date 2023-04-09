import { getCookie } from "./getCookie";

export const isAuth = (): boolean => {
  return !!getCookie("access_token");
};
