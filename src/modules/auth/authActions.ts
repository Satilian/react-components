import { SignInRequest } from "./../../api/dto/signInRequest";
import actionCreatorFactory from "typescript-fsa";
import { SignUpRequest } from "../../api/dto/signUpRequest";

const actionCreator = actionCreatorFactory("auth");

export const authActions = {
  signup: actionCreator.async<SignUpRequest, void, Error>("SIGNUP"),
  signin: actionCreator.async<SignInRequest, void, Error>("SIGNIN"),
};
