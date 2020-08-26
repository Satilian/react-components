import { SignInPage } from "./../modules/auth/components/SingInPage";
import { SignUpPage } from "./../modules/auth/components/SignUpPage";
import { IRoute } from "./../interfaces/rout";

export const authRouts: Record<string, IRoute> = {
  signin: {
    title: "Авторизация",
    link: "/signin",
    Component: SignInPage,
  },
  signup: {
    title: "Регистрация",
    link: "/signup",
    Component: SignUpPage,
  },
};
