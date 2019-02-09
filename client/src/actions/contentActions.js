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
      //console.log(response.data);
      dispatch({
        type: GET_CONTENT,
        payload: response.data
      });
      dispatch({
        type: CLEAR_FORM
      });
      if (!isEmpty(response.data[0].data) && dispatchForm) {
        let formData = {};
        formData.title = isEmpty(response.data[0].title)
          ? null
          : response.data[0].title;
        formData.calltoaction = isEmpty(response.data[0].calltoaction)
          ? null
          : response.data[0].calltoaction;
        response.data[0].data.forEach(element => {
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
        dispatch({
          type: POPULATE,
          payload: formData
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

// Show loading gif
export const setLoading = () => {
  return {
    type: LOADING
  };
}; //setLoading()
