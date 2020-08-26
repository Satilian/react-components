import { initialAdminState } from "./adminState";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export const adminReducer = reducerWithInitialState(initialAdminState);
