import { User } from "./../../api/dto/user";

export interface IAuthState {
  isAuth: boolean;
  user?: User;
}

export const authInitialState: IAuthState = {
  isAuth: false,
};
