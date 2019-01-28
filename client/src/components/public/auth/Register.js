// ./client/src/components/auth/Register.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";
import { formValueSelector } from "redux-form";

//To use Redux, you must connect a component to app state
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
const selector = formValueSelector("TFGData");

class Register extends Component {
  componentDidMount() {
    //But you're logged in, why do you want to be here?
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, passwordVerify } = this.props;

    const newUser = {
      name,
      email,
      password,
      passwordVerify
    };

    //Reducer action we bring in will be stored in props
    this.props.registerUser(newUser, this.props.history); //Call registerUser in ../../actions/authActions
  };

  render() {
    const { errors } = this.props;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your user account</p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  name="name"
                  type="name"
                  placeholder="Enter your name..."
                  error={errors.name}
                  label="Enter Name:"
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Enter your email..."
                  error={errors.email}
                  label="Enter Email:"
                  info="Your email address may be sold to the highest bidder from a South American country"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Enter password..."
                  error={errors.password}
                  label="Enter Password:"
                  info="Password should be between 5-30 characters. We don't enforce strong ones yet."
                />
                <TextFieldGroup
                  name="passwordVerify"
                  type="password"
                  placeholder="Enter password again..."
                  error={errors.passwordVerify}
                  label="Enter Same Password:"
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  state => {
    const formValues = {
      name: selector(state, "name"),
      email: selector(state, "email"),
      password: selector(state, "password"),
      passwordVerify: selector(state, "passwordVerify")
    };
    return formValues;
  },
  { registerUser }
)(withRouter(Register));
