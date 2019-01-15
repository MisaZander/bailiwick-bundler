//The root reducer
import { combineReducers } from "redux";

//All the application level reducers
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import contentReducer from "./contentReducer";

//Use {this.props.KEY} to invoke the application reducer
export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  content: contentReducer
});
