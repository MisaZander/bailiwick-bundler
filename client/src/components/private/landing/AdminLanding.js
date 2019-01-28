import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class AdminLanding extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h1>O hai</h1>
          </div>
        </div>
      </div>
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
