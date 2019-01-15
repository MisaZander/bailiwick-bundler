// ./client/src/components/auth/Register.js
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../common/TextFieldGroup";

//To use Redux, you must connect a component to app state
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordVerify: "",
      errors: {}
    };
  }

  componentDidMount() {
    //But you're logged in, why do you want to be here?
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, passwordVerify } = this.state;

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
    const { errors } = this.state;

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
                  value={this.state.name}
                  placeholder="Enter your name..."
                  onChange={this.onChange}
                  error={errors.name}
                  label="Enter Name:"
                />
                <TextFieldGroup
                  name="email"
                  type="email"
                  value={this.state.email}
                  placeholder="Enter your email..."
                  onChange={this.onChange}
                  error={errors.email}
                  label="Enter Email:"
                  info="Your email address may be sold to the highest bidder from a South American country"
                />
                <TextFieldGroup
                  name="password"
                  type="password"
                  value={this.state.password}
                  placeholder="Enter password..."
                  onChange={this.onChange}
                  error={errors.password}
                  label="Enter Password:"
                  info="Password should be between 5-30 characters. We don't enforce strong ones yet."
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

const mapStateToProps = state => ({
  auth: state.auth, //state.auth comes from the root reducer
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
