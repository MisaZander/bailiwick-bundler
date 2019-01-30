import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../../img/logo-bgless.png";

class PrivNavbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" />
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/admin">
                Admin Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/misc">
                Content Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/gallery">
                Gallery Manager
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/contact">
                Contact Preferences
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/users">
                Black Book
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default PrivNavbar;
