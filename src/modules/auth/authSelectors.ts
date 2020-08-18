import { createSelector } from "reselect";
import { TState } from "store";

const user = ({ auth }: TState) => auth.user;
const isAuth = ({ auth }: TState) => auth.isAuth;

export const authSelectors = {
  user: createSelector(user, (user) => user),
  isAuth: createSelector(isAuth, (isAuth) => isAuth),
};
