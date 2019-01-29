// ./client/src/components/auth/Login.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../actions/authActions";
import TextFieldGroup from "../../common/TextFieldGroup";
import { formValueSelector } from "redux-form";
import PubNavbar from "../layout/PubNavbar";
import Footer from "../layout/Footer";
const selector = formValueSelector("TFGData");

class Login extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      //But you're logged in, why do you want to be here?
      this.props.history.push("/");
    }
  }

  componentDidUpdate(prevProps) {
    // console.log("Update!");
    // console.log("Previous props");
    // console.log(prevProps);
    // console.log("Current props");
    // console.log(this.props);

    //On successful login, this will kick the user back home
    if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  onSubmit = () => {
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
        <PubNavbar />
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
        <Footer />
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
)(withRouter(Login));
