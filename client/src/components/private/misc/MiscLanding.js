import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PrivNavbar from "../layout/PrivNavbar";
import Icon from "../landing/Icon";
import Forbidden from "../../errors/Forbidden";

class MiscLanding extends Component {
  render() {
    return this.props.auth.user.userlevel >= this.props.minlevel ? (
      <div className="misclanding">
        <PrivNavbar />
        <h1 className="display-4 text-center">Customize What Makes You You</h1>
        <div className="container">
          <div className="row card-deck">
            <Icon
              icon="home"
              title="Home Page Editor"
              description="The first thing potential clients see. Edit the home page content"
              route="admin/misc/landing"
              buttontext="Clear for Landing"
              disabled="no"
            />
            <Icon
              icon="book"
              title="About You"
              description="Write all about yourself."
              route="admin/misc/about"
              buttontext="Dictate Autobiography"
              disabled="no"
            />
            <Icon
              icon="address-card"
              title="Calling Card"
              description="Manage the contact information you show to the public"
              route="admin/misc/contact"
              buttontext="Get in Touch"
              disabled="no"
            />
          </div>
        </div>
      </div>
    ) : (
      <Forbidden />
    );
  }
}

MiscLanding.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(MiscLanding));
