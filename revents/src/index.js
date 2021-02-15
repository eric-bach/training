import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ScrollToTop from "./app/common/util/ScrollToTop";
import "./index.css";
import App from "./app/layout/App.jsx";
import { configureStore } from "./app/store/configureStore";
import { loadEvents } from "./components/events/eventActions";

import * as serviceWorker from "./serviceWorker";

const store = configureStore();
store.dispatch(loadEvents());

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
