import { authReducer } from "../modules/auth/authReducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import ReduxThunk from "redux-thunk";
import { Action, AnyAction, Failure, Success } from "typescript-fsa";
import { appReducer } from "../modules/app/appReducer";

const createReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
});

const rootReducer = (state: TState = {} as TState, action: AnyAction) =>
  action.type === "CLEAR_STATE"
    ? createReducer({} as TState, action)
    : createReducer(state, action);

const whitelist: string[] = [];

export const configureStore = (initialState?: TState) => {
  const enhancer = composeWithDevTools(applyMiddleware(ReduxThunk));
  const persistedReducer = persistReducer({ key: "root", storage, whitelist }, rootReducer);
  const store = createStore(persistedReducer, initialState, enhancer);
  const persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};

export type TState = ReturnType<typeof createReducer>;
export type TAction<P, R> = Action<P | Success<P, R> | Failure<P, Error>>;
