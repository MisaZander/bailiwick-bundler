// ./client/src/actions/authActions.js
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  CLEAR_ERRORS,
  SET_CURRENT_USER,
  GET_CURRENT_USER,
  LOADING
} from "./types";

//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(response => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Login User
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(response => {
      //save token to localStorage
      const { token } = response.data;
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decodedToken = jwt_decode(token);
      //Set current user
      dispatch(clearErrors());
      dispatch(setCurrentUser(decodedToken));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Dispatch current user to superstate
export const setCurrentUser = decodedToken => {
  //This will be caught in the authReducer
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken
  };
};

//Get all user data
export const getCurrentUser = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/users")
    .then(response => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: response.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_CURRENT_USER,
        payload: {}
      });
    });
};

export const updateUser = newDeets => dispatch => {
  dispatch(setLoading());
  axios
    .put("/api/users", newDeets)
    .then(response => {
      dispatch({
        type: GET_CURRENT_USER,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

export const logoutUser = () => dispatch => {
  //Remove token from localStorage
  localStorage.removeItem("jwtToken");
  //86 the auth header from future requests
  setAuthToken(false);
  //Set current user to nada
  dispatch(setCurrentUser({})); //An empty object will signal isAuthed to false as well
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

export const setLoading = () => {
  return {
    type: LOADING
  };
};
