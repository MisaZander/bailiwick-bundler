import { reducer as formReducer } from "redux-form";
import { POPULATE } from "../actions/types";

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
      default:
        return state;
    }
  }
});
