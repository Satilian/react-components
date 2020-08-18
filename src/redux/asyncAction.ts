import { AsyncActionCreators } from "typescript-fsa";
import { ThunkAction } from "redux-thunk";
import { BaseRequest } from "../api/BaseRequest";
import { TAction, TState } from "./index";

const baseRequest = new BaseRequest();

export const asyncAction = <P, R>(
  params: P,
  request: (params: P, config?: Record<string, unknown>) => Promise<R> | R,
  action: AsyncActionCreators<P, R, Error>,
  callback?: (error?: Error, result?: R) => void
): ThunkAction<Promise<void>, TState, Error, TAction<P, R>> => async (dispatch) => {
  try {
    dispatch(action.started(params));
    const result = await request.bind(baseRequest)(params);
    dispatch(action.done({ params, result }));
    if (callback) callback(undefined, result);
  } catch (error) {
    dispatch(action.failed({ params, error }));
    if (callback) callback(error);
  }
};
