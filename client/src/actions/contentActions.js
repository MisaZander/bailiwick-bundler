// ./client/src/actions/contentActions.js
import axios from "axios";

import { GET_CONTENT, LOADING } from "./types";

//Get content for a page
export const getContent = page => dispatch => {
  dispatch(setLoading());
  let apiLink;
  switch (page) {
    default:
      apiLink = "/api/content"; //Landing
      break;
  }

  axios
    .get(apiLink)
    .then(response => {
      dispatch({
        type: GET_CONTENT,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CONTENT,
        payload: {}
      }); //dispatch
    }); //axios catch
}; //getContent()

// Show loading gif
export const setLoading = () => {
  return {
    type: LOADING
  };
}; //setLoading()
