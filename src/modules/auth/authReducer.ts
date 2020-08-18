import { reducerWithInitialState } from "typescript-fsa-reducers";
import { authInitialState } from "./authState";

export const authReducer = reducerWithInitialState(authInitialState);
