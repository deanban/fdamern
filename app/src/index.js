import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createViewportReducer } from "redux-map-gl";

import recallReducer from "./reducers/recallReducer";
import searchReducer from "./reducers/searchReducer";

const rootReducer = combineReducers({
  map: createViewportReducer(),
  data: recallReducer,
  searchTerm: searchReducer
});
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <App store={store} />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
