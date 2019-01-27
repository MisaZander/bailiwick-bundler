// ./components/public/auth/Profile.js
import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../../common/TextFieldGroup";
import isEmpty from "../../../validation/is-empty";
import { getCurrentUser, updateUser } from "../../../actions/authActions";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordVerify: "",
      errors: {}
    };
  }

  componentDidMount() {
    this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth.user) {
      const user = nextProps.auth.user;

      user.name = !isEmpty(user.name) ? user.name : "";
      user.email = !isEmpty(user.email) ? user.email : "";

      this.setState({
        name: user.name,
        email: user.email
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

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
    this.setState({ password: "", passwordVerify: "" });
    alert("Profile updated!");
  };

  //TODO: Start here and render the profile
  render() {
    const { errors } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="display-4 text-center">Edit Profile</h1>
            <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                label="Name"
                name="name"
                value={this.state.name}
                placeholder="Your Name..."
                onChange={this.onChange}
                error={errors.name}
              />
              <TextFieldGroup
                label="Email"
                name="email"
                value={this.state.email}
                placeholder="Your email..."
                onChange={this.onChange}
                error={errors.email}
              />
              <hr className="my-3" />
              <small>
                If you want to change your password, fill out these fields and
                submit.
              </small>
              <TextFieldGroup
                label="New Password"
                name="password"
                type="password"
                value={this.state.password}
                placeholder="Enter new password..."
                onChange={this.onChange}
                error={errors.password}
                info="New password must be between 5-30 characters"
              />
              <TextFieldGroup
                name="passwordVerify"
                type="password"
                value={this.state.passwordVerify}
                placeholder="Enter password again..."
                onChange={this.onChange}
                error={errors.passwordVerify}
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
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { getCurrentUser, updateUser }
)(Profile);
