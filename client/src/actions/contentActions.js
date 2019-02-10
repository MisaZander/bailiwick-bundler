// ./client/src/actions/contentActions.js
import axios from "axios";

import { GET_CONTENT, LOADING, CLEAR_FORM, POPULATE } from "./types";
import isEmpty from "../validation/is-empty";

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
      console.log("Axios GET:", response.data);
      dispatch({
        type: GET_CONTENT,
        payload: response.data
      });
      dispatch({
        type: CLEAR_FORM
      });
      if (!isEmpty(response.data[0].data) && dispatchForm) {
        //console.log("Calling populateForm");
        dispatch(populateForm(response.data[0]));
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
      console.log("Axios PUT:", response.data);
      let wrappedData = [];
      wrappedData.push(response.data); //Public content expects an array
      dispatch({
        type: GET_CONTENT,
        payload: wrappedData
      });
      dispatch({
        type: CLEAR_FORM
      });
      dispatch(populateForm(response.data));
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

const populateForm = data => dispatch => {
  console.log("Pupulating...:", data);
  let formData = {};
  formData.title = isEmpty(data.title) ? null : data.title;
  formData.calltoaction = isEmpty(data.calltoaction) ? null : data.calltoaction;
  data.data.forEach(element => {
    for (var key in element) {
      if (element.hasOwnProperty(key)) {
        if (key === "key" || key === "texttype" || key === "_id") {
          continue;
        } else {
          formData[element.texttype + key + element.key] = element[key];
        }
      }
    }
  });
  console.log("Dispatching Form data:", formData);
  dispatch({
    type: POPULATE,
    payload: formData
  });
};
