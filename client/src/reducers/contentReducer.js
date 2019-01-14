// ./client/src/reducers/contentReducer.js
import { LOADING, GET_CONTENT } from "../actions/types";

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    case GET_CONTENT:
      return {
        ...state,
        content: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
