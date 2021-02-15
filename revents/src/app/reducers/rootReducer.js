import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";

import testReducer from "../../components/testarea/testReducer";
import eventReducer from "../../components/events/eventReducer";
import modalReducer from "../../components/modals/modalReducer";
import authReducer from "../../components/auth/authReducer";
import asyncReducer from "../../components/async/asyncReducer";

const rootReducer = combineReducers({
  form: FormReducer,
  test: testReducer,
  events: eventReducer,
  modals: modalReducer,
  auth: authReducer,
  async: asyncReducer
});

export default rootReducer;
