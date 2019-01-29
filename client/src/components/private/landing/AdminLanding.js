import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivNavbar from "../layout/PrivNavbar";
import Forbidden from "../../errors/Forbidden";

class AdminLanding extends Component {
  render() {
    return this.props.auth.user.userlevel >= this.props.minlevel ? (
      <div className="adminlanding">
        <PrivNavbar />
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>O hai</h1>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <Forbidden />
    );
  }
}

AdminLanding.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(AdminLanding));
