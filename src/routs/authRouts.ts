import { IRoute } from "./../interfaces/rout";

export const authRouts: Record<string, IRoute> = {
  signin: {
    title: "Авторизация",
    link: "/signin",
  },
  signup: {
    title: "Регистрация",
    link: "/signup",
  },
};
