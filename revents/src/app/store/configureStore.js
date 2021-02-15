import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers/rootReducer";

export const configureStore = () => {
  const middlewares = [thunk];

  const composeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));

  const store = createStore(rootReducer, composeEnhancer);

  return store;
};
