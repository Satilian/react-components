import { initialAppState } from "./appState";
import { reducerWithInitialState } from "typescript-fsa-reducers";

export const appReducer = reducerWithInitialState(initialAppState);
