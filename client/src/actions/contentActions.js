// ./client/src/actions/contentActions.js
import axios from "axios";

import { GET_CONTENT, LOADING, CLEAR_FORM, POPULATE } from "./types";
import isEmpty from "../validation/is-empty";
import docuparser from "../utils/M-RFconverter";

//Get content for a page
export const getContent = (page, dispatchForm = false) => dispatch => {
  dispatch(setLoading());
  let apiLink;
  switch (page) {
    case "about":
      apiLink = "/api/content/about";
      break;
    case "contact":
      apiLink = "/api/content/contact";
      break;
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
      dispatch({
        type: CLEAR_FORM
      });
      if (!isEmpty(response.data[0].data) && dispatchForm) {
        dispatch({
          type: POPULATE,
          payload: docuparser.MongoToRF(response.data[0])
        });
      }
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CONTENT,
        payload: {}
      }); //dispatch
    }); //axios catch
}; //getContent()

export const alterContent = (target, newDocument) => dispatch => {
  dispatch(setLoading());
  let apiLink;
  switch (target) {
    case "about":
      apiLink = "/api/content/about";
      break;
    case "contact":
      apiLink = "/api/content/contact";
      break;
    default:
      apiLink = "/api/content/landing"; //Landing
      break;
  }
  axios
    .put(apiLink, newDocument)
    .then(response => {
      let wrappedData = [];
      wrappedData.push(response.data); //Public content expects an array
      dispatch({
        type: GET_CONTENT,
        payload: wrappedData
      });
      dispatch({
        type: CLEAR_FORM
      });
      dispatch({
        type: POPULATE,
        payload: docuparser.MongoToRF(response.data)
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CONTENT,
        payload: {}
      });
    });
};

// Show loading gif
export const setLoading = () => {
  return {
    type: LOADING
  };
}; //setLoading()
