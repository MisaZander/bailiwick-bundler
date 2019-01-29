// ./client/src/components/auth/Login.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import { formValueSelector } from "redux-form";
const selector = formValueSelector("TFGData");

class Login extends Component {
  onSubmit = e => {
    //Set by redux-form
    const { email, password } = this.props;

    const userData = {
      email,
      password
    };

    this.props.loginUser(userData);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to your account</p>
              <form>
                <TextFieldGroup
                  name="email"
                  type="email"
                  placeholder="Enter your email..."
                  label="Enter Email:"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  placeholder="Enter password..."
                  label="Enter Password:"
                />
                <button
                  type="button"
                  className="btn btn-info btn-block mt-4"
                  onClick={this.onSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//Redux-form values will be written to props
//You MUST include names of any reducers you write yourself
//You MUST also include a selector for any form value you want as a prop
export default connect(
  state => ({
    auth: state.auth,
    email: selector(state, "email"),
    password: selector(state, "password")
  }),
  { loginUser }
)(Login);
