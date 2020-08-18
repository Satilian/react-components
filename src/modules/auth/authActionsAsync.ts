import { SignInRequest } from "./../../api/dto/signInRequest";
import { SignUpRequest } from "../../api/dto/signUpRequest";
import { authActions } from "./authActions";
import { requestsRepository } from "./../../api/requestsRepository";
import { asyncAction } from "./../../redux/asyncAction";

const { signup, signin } = requestsRepository.auth;

export const authActionsAsync = {
  signup: (params: SignUpRequest) => asyncAction(params, signup, authActions.signup),
  signin: (params: SignInRequest) => asyncAction(params, signin, authActions.signin),
};
