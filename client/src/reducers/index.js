//The root reducer
import { combineReducers } from "redux";

//All the application level reducers
import errorReducer from "./errorReducer";

//Use {this.props.KEY} to invoke the application reducer
export default combineReducers({
  errors: errorReducer
});
