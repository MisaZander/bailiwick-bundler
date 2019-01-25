import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../../actions/authActions";
import logo from "../../../img/logo-bgless.png";

class PubNavbar extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    let userInfo;
    if (isAuthenticated) {
      userInfo = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              {user.name}
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="\#" onClick={this.onLogoutClick}>
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      userInfo = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">
                Gallery
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact/form">
                Contact
              </Link>
            </li>
          </ul>
          {"   |    "}
          {userInfo}
        </div>
      </nav>
    );
  }
}

PubNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

//Bring in the auth state
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(PubNavbar);
