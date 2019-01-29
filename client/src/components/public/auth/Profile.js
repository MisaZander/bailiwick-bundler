// ./components/public/auth/Profile.js
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { formValueSelector } from "redux-form";

import TextFieldGroup from "../../common/TextFieldGroup";
import isEmpty from "../../../validation/is-empty";
import { getCurrentUser, updateUser } from "../../../actions/authActions";
const selector = formValueSelector("TFGData");

class Profile extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  onSubmit = e => {
    e.preventDefault();
    //console.log("There was an attempt");
    const newDeets = {
      name: this.state.name,
      email: this.state.email,
      password: !isEmpty(this.state.password) ? this.state.password : "",
      passwordVerify: !isEmpty(this.state.passwordVerify)
        ? this.state.passwordVerify
        : ""
    };

    this.props.updateUser(newDeets);
    // this.setState({ password: "", passwordVerify: "" });
    alert("Profile updated!");
  };

  //TODO: Start here and render the profile
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                label="Name"
                name="name"
                placeholder="Your Name..."
              />
              <TextFieldGroup
                label="Email"
                name="email"
                type="email"
                placeholder="Your email..."
              />
              <hr className="my-3" />
              <h4>
                If you want to change your password, fill out these fields and
                submit.
              </h4>
              <TextFieldGroup
                label="New Password"
                name="password"
                type="password"
                placeholder="Enter new password..."
                info="New password must be between 5-30 characters"
              />
              <TextFieldGroup
                name="passwordVerify"
                type="password"
                placeholder="Enter password again..."
                label="Enter Same Password:"
              />
              <button
                onClick={this.onSubmit}
                className="btn btn-info btn-block"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//Store all the Redux states in props
export default connect(
  state => ({
    auth: state.auth,
    name: selector(state, "name"),
    email: selector(state, "email"),
    password: selector(state, "password"),
    passwordVerify: selector(state, "passwordVerify")
  }),
  { getCurrentUser, updateUser }
)(Profile);
