import { SignInRequest } from "./dto/signInRequest";
import { BaseRequest } from "./BaseRequest";
import { SignUpRequest } from "./dto/signUpRequest";

export class AuthApiRequests extends BaseRequest {
  signup(params: SignUpRequest): void {
    this.fetch("auth/signup", {
      method: "POST",
      body: JSON.stringify(params),
    }).catch(BaseRequest.handleError);
  }

  signin(params: SignInRequest): void {
    this.fetch("auth/signin", {
      method: "POST",
      body: JSON.stringify(params),
    }).catch(BaseRequest.handleError);
  }
}
