import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; //The index.js file

const initalState = {}; //The root should have a blank state

const middleware = [thunk]; //More than one middleware can go here

const store = createStore(
  rootReducer,
  initalState,
  compose(applyMiddleware(...middleware))
);

export default store;
