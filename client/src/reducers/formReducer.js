import { reducer as formReducer } from "redux-form";
import { POPULATE, CLEAR_PASSWORD } from "../actions/types";

const initialState = {};

export default formReducer.plugin({
  TFGData: (state = initialState, action) => {
    // <--- name of form
    switch (action.type) {
      case POPULATE:
        return {
          ...state,
          values: {
            ...state.values,
            ...action.payload
          }
        };
      case CLEAR_PASSWORD:
        return {
          ...state,
          values: {
            ...state.values,
            password: undefined,
            passwordVerify: undefined
          },
          fields: {
            ...state.fields,
            password: undefined,
            passwordVerify: undefined
          }
        };
      default:
        return state;
    }
  }
});
